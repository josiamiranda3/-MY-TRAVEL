export type Continent = 
  | 'South America'
  | 'North America'
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'Oceania';

export type Category = 
  | 'Beaches'
  | 'Nature'
  | 'Adventure'
  | 'Culture'
  | 'Cities'
  | 'Mountains';

export type BudgetTier = '$' | '$$' | '$$$' | '$$$$';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  city?: string;
  country: string;
  continent: Continent;
  description: string;
  category: Category;
  image: string;
  gallery: string[];
  estimatedBudget: number; // Daily USD average
  budgetTier: BudgetTier;
  recommendedDuration: string;
  bestTimeToVisit: string;
  attractions: string[];
  travelTips: string[];
  popularity: number; // 1-100
  featured?: boolean;
}

export interface TripActivity {
  id: string;
  day: number;
  time?: string;
  title: string;
  location?: string;
  estimatedExpense: number; // USD
  completed: boolean;
  category: 'Attraction' | 'Dining' | 'Transport' | 'Stay' | 'Leisure';
  notes?: string;
}

export interface Trip {
  id: string;
  title: string;
  destinationSlug: string;
  destinationName: string;
  destinationCountry: string;
  destinationImage: string;
  departureDate: string; // ISO YYYY-MM-DD
  returnDate: string;    // ISO YYYY-MM-DD
  notes?: string;
  activities: TripActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  bio: string;
  favoriteCategories: Category[];
  preferredContinents: Continent[];
  travelStyle: 'Slow travel' | 'Backpacking' | 'Luxury & Boutique' | 'Eco-tourist' | 'Cultural immersion';
  preferredBudget: BudgetTier;
  theme: 'light' | 'dark';
  language: string;
}

export type SortOption = 'popularity' | 'name-asc' | 'name-desc' | 'budget-asc' | 'budget-desc';

export interface DestinationFilters {
  searchQuery: string;
  continent: Continent | 'All';
  category: Category | 'All';
  budgetTier: BudgetTier | 'All';
  sortBy: SortOption;
}
