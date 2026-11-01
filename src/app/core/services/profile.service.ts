import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models/travel.model';
import { StorageService } from './storage.service';
export const AVATAR_OPTIONS = [
 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80',
 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80&',
 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
];




const DEFAULT_PROFILE: UserProfile = { name:'Alex Rivera', avatar:AVATAR_OPTIONS[0], bio:'Passionate explorer, landscape photographer, and culinary wanderer. Seeking authentic cultural trails.', favoriteCategories:['Nature','Culture','Mountains'], preferredContinents:['South America','Europe','Asia'], travelStyle:'Slow travel', preferredBudget:'$$$', theme:'light', language:'English' };
@Injectable({providedIn:'root'})
export class ProfileService {
 readonly profile = signal<UserProfile>(this.storage.get<UserProfile>('mytravel_user_profile', DEFAULT_PROFILE));
 constructor(private storage:StorageService) { this.profile.set({...DEFAULT_PROFILE,...this.profile()}); this.applyTheme(); }
 update(changes:Partial<UserProfile>):void { this.profile.update(p=>({...p,...changes})); this.storage.set('mytravel_user_profile',this.profile()); this.applyTheme(); }
 toggleTheme():void { this.update({theme:this.profile().theme==='light'?'dark':'light'}); }
 applyTheme():void { if (typeof document!=='undefined') document.documentElement.classList.toggle('dark',this.profile().theme==='dark'); }
}
