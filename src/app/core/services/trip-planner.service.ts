import { Injectable, computed, signal } from '@angular/core';
import { Trip, TripActivity } from '../models/travel.model';
import { StorageService } from './storage.service';

@Injectable({providedIn:'root'})
export class TripPlannerService {
  readonly trips = signal<Trip[]>([]);
  readonly loaded = signal(false);
  readonly totalBudget = computed(()=>this.trips().reduce((sum,t)=>sum+this.totalExpenses(t),0));
  constructor(private storage:StorageService) { void this.init(); }
  private async init():Promise<void> {
    try {
      const indexed = await this.storage.getAll<Trip>('trips');
      const backup = this.storage.get<Trip[]>('mytravel_trips_backup',[]);
      this.trips.set(indexed.length ? indexed : backup);
      if (!this.trips().length && !this.storage.get<boolean>('mytravel_seeded',false)) {
        const sample:Trip = { id:'trip-sample-kyoto', title:'Autumn Serenity in Kyoto & Arashiyama', destinationSlug:'kyoto', destinationName:'Kyoto', destinationCountry:'Japan', destinationImage:'/assets/images/dest_kyoto_bamboo_1793556739585.jpg', departureDate:'2026-11-12', returnDate:'2026-11-18', notes:'Early morning temple walks, tea ceremony and seasonal cuisine.', activities:[{id:'act-1',day:1,time:'08:00',title:'Arashiyama Bamboo Grove',location:'Arashiyama',estimatedExpense:35,completed:true,category:'Attraction'},{id:'act-2',day:1,time:'12:30',title:'Traditional Kyoto lunch',location:'Arashiyama',estimatedExpense:65,completed:false,category:'Dining'},{id:'act-3',day:2,time:'07:30',title:'Fushimi Inari shrine walk',location:'Fushimi',estimatedExpense:15,completed:false,category:'Attraction'}],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
        this.trips.set([sample]); await this.persist(); this.storage.set('mytravel_seeded',true);
      }
    } finally { this.loaded.set(true); }
  }
  validateDates(start:string,end:string):string|null { if(!start||!end)return 'Informe as datas de ida e volta.'; if(new Date(end)<new Date(start))return 'A data de retorno não pode ser anterior à partida.'; return null; }
  async create(data:Omit<Trip,'id'|'createdAt'|'updatedAt'|'activities'>):Promise<void> { const error=this.validateDates(data.departureDate,data.returnDate); if(error)throw new Error(error); const now=new Date().toISOString(); this.trips.update(items=>[{...data,id:crypto.randomUUID(),activities:[],createdAt:now,updatedAt:now},...items]); await this.persist(); }
  async update(id:string,changes:Partial<Trip>):Promise<void> { const existing=this.trips().find(t=>t.id===id); if(!existing)throw new Error('Trip not found'); const start=changes.departureDate??existing.departureDate; const end=changes.returnDate??existing.returnDate; const error=this.validateDates(start,end); if(error)throw new Error(error); this.trips.update(items=>items.map(t=>t.id===id?{...t,...changes,updatedAt:new Date().toISOString()}:t)); await this.persist(); }
  async remove(id:string):Promise<void> { this.trips.update(items=>items.filter(t=>t.id!==id)); await this.storage.delete('trips',id); this.storage.set('mytravel_trips_backup',this.trips()); }
  async addActivity(tripId:string,data:Omit<TripActivity,'id'>):Promise<void> { if(data.estimatedExpense<0)throw new Error('A despesa não pode ser negativa.'); this.trips.update(items=>items.map(t=>t.id===tripId?{...t,activities:[...t.activities,{...data,id:crypto.randomUUID()}],updatedAt:new Date().toISOString()}:t)); await this.persist(); }
  async updateActivity(tripId:string,activityId:string,changes:Partial<TripActivity>):Promise<void> { this.trips.update(items=>items.map(t=>t.id===tripId?{...t,activities:t.activities.map(a=>a.id===activityId?{...a,...changes}:a),updatedAt:new Date().toISOString()}:t)); await this.persist(); }
  async removeActivity(tripId:string,activityId:string):Promise<void> { this.trips.update(items=>items.map(t=>t.id===tripId?{...t,activities:t.activities.filter(a=>a.id!==activityId)}:t)); await this.persist(); }
  async toggleActivity(tripId:string,activityId:string):Promise<void> { const trip=this.trips().find(t=>t.id===tripId); const activity=trip?.activities.find(a=>a.id===activityId); if(activity)await this.updateActivity(tripId,activityId,{completed:!activity.completed}); }
  totalExpenses(trip:Trip):number { return trip.activities.reduce((sum,a)=>sum+(Number(a.estimatedExpense)||0),0); }
  duration(trip:Trip):number { return Math.max(1,Math.ceil((new Date(trip.returnDate).getTime()-new Date(trip.departureDate).getTime())/86400000)+1); }
  private async persist():Promise<void> { this.storage.set('mytravel_trips_backup',this.trips()); for(const trip of this.trips()) await this.storage.put('trips',trip); }
}
