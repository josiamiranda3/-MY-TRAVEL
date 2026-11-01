import { Injectable, computed, signal } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({providedIn:'root'})
export class WishlistService {
  private readonly key = 'mytravel_wishlist_slugs';
  readonly slugs = signal<string[]>(this.storage.get<string[]>(this.key, []));
  readonly count = computed(() => this.slugs().length);
  constructor(private storage: StorageService) {}
  isSaved(slug: string): boolean { return this.slugs().includes(slug); }
  toggle(slug: string): boolean { const saved = this.isSaved(slug); this.slugs.update(items => saved ? items.filter(x=>x!==slug) : [...items,slug]); this.persist(); return !saved; }
  add(slug:string):void { if (!this.isSaved(slug)) { this.slugs.update(items=>[...items,slug]); this.persist(); } }
  remove(slug:string):void { this.slugs.update(items=>items.filter(x=>x!==slug)); this.persist(); }
  private persist():void { this.storage.set(this.key,this.slugs()); }
}
