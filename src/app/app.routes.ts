import { Routes } from '@angular/router';
export const routes: Routes = [
 {path:'',loadComponent:()=>import('./features/home/home.component').then(m=>m.HomeComponent),title:'MY TRAVEL — Discover the World'},
 {path:'explore',loadComponent:()=>import('./features/explore/explore.component').then(m=>m.ExploreComponent),title:'Explore Destinations — MY TRAVEL'},
 {path:'destination/:slug',loadComponent:()=>import('./features/destination-detail/destination-detail.component').then(m=>m.DestinationDetailComponent),title:'Destination — MY TRAVEL'},
 {path:'wishlist',loadComponent:()=>import('./features/wishlist/wishlist.component').then(m=>m.WishlistComponent),title:'My Wishlist — MY TRAVEL'},
 {path:'planner',loadComponent:()=>import('./features/planner/planner.component').then(m=>m.PlannerComponent),title:'Trip Planner — MY TRAVEL'},
 {path:'profile',loadComponent:()=>import('./features/profile/profile.component').then(m=>m.ProfileComponent),title:'My Profile — MY TRAVEL'},
 {path:'**',loadComponent:()=>import('./features/not-found/not-found.component').then(m=>m.NotFoundComponent),title:'Page not found — MY TRAVEL'}
];
