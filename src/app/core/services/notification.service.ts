import { Injectable, signal } from '@angular/core';
export interface Notice { id:number; message:string; type:'success'|'error'|'info'; }
@Injectable({providedIn:'root'})
export class NotificationService {
 readonly notices=signal<Notice[]>([]);
 show(message:string,type:Notice['type']='success'):void { const id=Date.now()+Math.random(); this.notices.update(items=>[...items,{id,message,type}]); setTimeout(()=>this.notices.update(items=>items.filter(n=>n.id!==id)),3200); }
 dismiss(id:number):void { this.notices.update(items=>items.filter(n=>n.id!==id)); }
}
