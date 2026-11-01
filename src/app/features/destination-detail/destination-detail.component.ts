import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DestinationService } from '../../core/services/destination.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { NotificationService } from '../../core/services/notification.service';
@Component({selector:'app-destination-detail',standalone:true,imports:[CommonModule,RouterLink],template:`
@if (destination(); as dest) {<section class="detail-hero" [style.background-image]="backgroundFor(dest.image)"><div class="container detail-hero-copy"><a routerLink="/explore" class="back-link">← All destinations</a><span class="eyebrow light-eyebrow">{{dest.continent}} · {{dest.category}}</span><h1>{{dest.name}}</h1><p>⌖ {{dest.city||dest.name}}, {{dest.country}}</p></div></section>
<section class="container detail-layout"><div class="detail-main"><div class="detail-intro"><span class="eyebrow">THE DESTINATION</span><h2>A place to <em>remember.</em></h2><p>{{dest.description}}</p><div class="detail-actions"><button class="btn btn-primary" (click)="save(dest.slug)">{{wishlist.isSaved(dest.slug)?'♥ Saved to wishlist':'♡ Add to wishlist'}}</button><button class="btn btn-outline" (click)="plan(dest.slug)">＋ Plan a trip</button></div></div>
<div class="gallery-grid"><button class="gallery-main" (click)="openGallery(0)"><img [src]="dest.gallery[0]||dest.image" [alt]="dest.name"/><span>View gallery ↗</span></button><div class="gallery-side">@for(img of dest.gallery.slice(1,3);track img;let i=$index){<button (click)="openGallery(i+1)"><img [src]="img" [alt]="dest.name+' view '+(i+2)"/></button>}</div></div>
<div class="facts-grid"><div><span>BEST TIME TO VISIT</span><b>{{dest.bestTimeToVisit}}</b></div><div><span>RECOMMENDED STAY</span><b>{{dest.recommendedDuration}}</b></div><div><span>ESTIMATED DAILY BUDGET</span><b>&#36;{{dest.estimatedBudget}} USD</b></div></div>
<section class="detail-section"><span class="eyebrow">DON'T MISS</span><h2>Highlights & <em>experiences.</em></h2><div class="attraction-list">@for(item of dest.attractions;track item;let i=$index){<div><span>0{{i+1}}</span><b>{{item}}</b></div>}</div></section>
<section class="detail-section"><span class="eyebrow">LOCAL KNOW-HOW</span><h2>A few useful <em>tips.</em></h2><ul class="tips-list">@for(tip of dest.travelTips;track tip){<li>{{tip}}</li>}</ul></section>
</div><aside class="detail-aside"><div class="aside-card"><span class="eyebrow">PLAN YOUR ESCAPE</span><h3>{{dest.name}} is calling.</h3><p>Start collecting ideas and turn inspiration into a real itinerary.</p><button class="btn btn-primary full" (click)="plan(dest.slug)">Create a trip →</button><div class="aside-note">Travel budget estimates are illustrative and may vary by season and travel style.</div></div></aside></section>
@if(galleryOpen()){<div class="lightbox" (click)="galleryOpen.set(false)"><button class="lightbox-close" (click)="$event.stopPropagation();galleryOpen.set(false)">×</button><button class="lightbox-arrow prev" (click)="$event.stopPropagation();move(-1)">‹</button><img [src]="dest.gallery[galleryIndex()]||dest.image" [alt]="dest.name" (click)="$event.stopPropagation()"/><button class="lightbox-arrow next" (click)="$event.stopPropagation();move(1)">›</button><span>{{galleryIndex()+1}} / {{dest.gallery.length}}</span></div>}
}@else{<section class="empty-state page-section"><h2>Destination not found</h2><p>This place may have moved or is not in our collection.</p><a routerLink="/explore" class="btn btn-primary">Explore destinations</a></section>}
`,})
export class DestinationDetailComponent {
 private route=inject(ActivatedRoute); private router=inject(Router); private data=inject(DestinationService); readonly wishlist=inject(WishlistService); private notify=inject(NotificationService);
 slug=signal(''); galleryOpen=signal(false); galleryIndex=signal(0); readonly destination=computed(()=>this.data.getBySlug(this.slug()));
 constructor(){this.route.paramMap.subscribe(p=>this.slug.set(p.get('slug')||''));}
 backgroundFor(image:string):string{return `linear-gradient(0deg,rgba(8,22,16,.76),rgba(8,22,16,.08)),url("${image}")`;}
 save(slug:string){const saved=this.wishlist.toggle(slug);this.notify.show(saved?'Added to your wishlist':'Removed from your wishlist');}
 plan(slug:string){this.router.navigate(['/planner'],{queryParams:{destination:slug}});}
 openGallery(index:number){this.galleryIndex.set(index);this.galleryOpen.set(true);}
 move(step:number){const total=this.destination()?.gallery.length||1;this.galleryIndex.update(i=>(i+step+total)%total);}
 @HostListener('window:keydown',['$event']) handleKey(event:KeyboardEvent){if(!this.galleryOpen())return;if(event.key==='Escape')this.galleryOpen.set(false);if(event.key==='ArrowRight')this.move(1);if(event.key==='ArrowLeft')this.move(-1);}
}
