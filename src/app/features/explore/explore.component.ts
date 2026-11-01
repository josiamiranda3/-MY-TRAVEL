import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DestinationService } from '../../core/services/destination.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { BudgetTier, Category, Continent, DestinationFilters, SortOption } from '../../core/models/travel.model';
@Component({selector:'app-explore',standalone:true,imports:[CommonModule,FormsModule,RouterLink],template:`
<section class="page-hero compact-hero"><div class="container"><span class="eyebrow light-eyebrow">WORLDWIDE DIRECTORY</span><h1>Explore <em>destinations.</em></h1><p>Find a place that speaks to your sense of adventure.</p></div></section>
<section class="container page-section"><div class="explore-toolbar"><div class="search-field"><span>⌕</span><input [ngModel]="query()" (ngModelChange)="query.set($event)" placeholder="Search destinations, cities, countries or attractions..." aria-label="Search destinations"/><button [hidden]="!query()" (click)="query.set('')">×</button></div><select [ngModel]="sort()" (ngModelChange)="sort.set($event)" aria-label="Sort destinations"><option value="popularity">Most popular</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option><option value="budget-asc">Budget: low to high</option><option value="budget-desc">Budget: high to low</option></select><button class="btn btn-outline filter-toggle" (click)="filtersOpen=!filtersOpen">☷ Filters</button></div>
<div class="filter-panel" [class.open]="filtersOpen"><div class="filter-group"><b>Continent</b><div class="filter-options">@for(item of continents;track item){<button [class.selected]="continent()===item" (click)="continent.set(item)">{{item}}</button>}</div></div><div class="filter-group"><b>Experience</b><div class="filter-options">@for(item of categories;track item){<button [class.selected]="category()===item" (click)="category.set(item)">{{item}}</button>}</div></div><div class="filter-group"><b>Daily budget</b><div class="filter-options">@for(item of budgets;track item){<button [class.selected]="budget()===item" (click)="budget.set(item)">{{item}}</button>}</div></div><button class="text-link reset" (click)="reset()">↺ Clear all filters</button></div>
<div class="results-line"><span><b>{{filtered().length}}</b> destinations to discover</span><span>Showing {{visible().length}} of {{filtered().length}}</span></div>
<div class="destination-grid explore-grid">@for(dest of visible();track dest.id){<article class="destination-card"><a [routerLink]="['/destination',dest.slug]" class="card-image"><img [src]="dest.image" [alt]="dest.name"/><span class="image-label">{{dest.continent}}</span></a><button class="favorite-btn" [class.saved]="wishlist.isSaved(dest.slug)" (click)="wishlist.toggle(dest.slug)">{{wishlist.isSaved(dest.slug)?'♥':'♡'}}</button><div class="card-copy"><div class="card-meta">{{dest.country}} <span>·</span> {{dest.category}}</div><a [routerLink]="['/destination',dest.slug]" class="card-title">{{dest.name}}</a><p>{{dest.description}}</p><div class="card-bottom"><span>From <b>&#36;{{dest.estimatedBudget}}</b> / day</span><a [routerLink]="['/destination',dest.slug]">Discover →</a></div></div></article>}</div>
<div class="empty-state" *ngIf="filtered().length===0"><span>⌕</span><h2>No destinations found</h2><p>Try another search or remove some filters.</p><button class="btn btn-primary" (click)="reset()">Clear filters</button></div>
<div class="load-more" *ngIf="visible().length<filtered().length"><button class="btn btn-outline" (click)="loadMore()">Load more destinations ↓</button></div>
</section>`,})
export class ExploreComponent {
 private route=inject(ActivatedRoute); private router=inject(Router); readonly data=inject(DestinationService); readonly wishlist=inject(WishlistService);
 query=signal(''); continent=signal<Continent|'All'>('All'); category=signal<Category|'All'>('All'); budget=signal<BudgetTier|'All'>('All'); sort=signal<SortOption>('popularity'); filtersOpen=true; limit=signal(9);
 continents=this.data.continents; categories=this.data.categoryOptions; budgets:(BudgetTier|'All')[]=['All','$','$$','$$$','$$$$'];
 constructor(){this.route.queryParamMap.subscribe(p=>{this.query.set(p.get('q')||'');this.category.set((p.get('category') as Category)||'All');this.continent.set((p.get('continent') as Continent)||'All');this.sort.set((p.get('sort') as SortOption)||'popularity');});}
 readonly filtered=computed(()=>this.data.filter({searchQuery:this.query(),continent:this.continent(),category:this.category(),budgetTier:this.budget(),sortBy:this.sort()}));
 readonly visible=computed(()=>this.filtered().slice(0,this.limit()));
 loadMore(){this.limit.update(n=>n+9);}
 reset(){this.query.set('');this.continent.set('All');this.category.set('All');this.budget.set('All');this.sort.set('popularity');this.limit.set(9);this.router.navigate(['/explore']);}
}
