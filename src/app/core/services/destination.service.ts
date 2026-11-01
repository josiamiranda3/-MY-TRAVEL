import { Injectable, computed, signal } from '@angular/core';
import { DESTINATIONS, CATEGORIES_DATA } from '../data/destinations';
import { Category, Continent, Destination, DestinationFilters, SortOption } from '../models/travel.model';

@Injectable({ providedIn: 'root' })
export class DestinationService {
  readonly destinations = signal<Destination[]>(DESTINATIONS);
  readonly categories = CATEGORIES_DATA;
  readonly continents: (Continent | 'All')[] = ['All','South America','North America','Europe','Asia','Africa','Oceania'];
  readonly categoryOptions: (Category | 'All')[] = ['All','Beaches','Nature','Adventure','Culture','Cities','Mountains'];
  readonly featured = computed(() => this.destinations().filter(d => d.featured));
  getBySlug(slug: string): Destination | undefined { return this.destinations().find(d => d.slug === slug); }
  getFeatured(): Destination[] { return this.featured(); }
  getPopular(limit = 6): Destination[] { return [...this.destinations()].sort((a,b)=>b.popularity-a.popularity).slice(0,limit); }
  filter(filters: DestinationFilters): Destination[] {
    const q = filters.searchQuery.trim().toLowerCase();
    const result = this.destinations().filter(d => {
      const searchable = [d.name,d.city,d.country,d.continent,d.category,d.description,...d.attractions].join(' ').toLowerCase();
      return (!q || searchable.includes(q)) && (filters.continent === 'All' || d.continent === filters.continent) && (filters.category === 'All' || d.category === filters.category) && (filters.budgetTier === 'All' || d.budgetTier === filters.budgetTier);
    });
    const sorters: Record<SortOption,(a:Destination,b:Destination)=>number> = {
      popularity:(a,b)=>b.popularity-a.popularity, 'name-asc':(a,b)=>a.name.localeCompare(b.name), 'name-desc':(a,b)=>b.name.localeCompare(a.name), 'budget-asc':(a,b)=>a.estimatedBudget-b.estimatedBudget, 'budget-desc':(a,b)=>b.estimatedBudget-a.estimatedBudget
    };
    return result.sort(sorters[filters.sortBy]);
  }
}
