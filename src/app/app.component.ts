import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WishlistService } from './core/services/wishlist.service';
import { ProfileService } from './core/services/profile.service';
import { NotificationService } from './core/services/notification.service';
@Component({selector:'app-root',standalone:true,imports:[CommonModule,RouterOutlet,RouterLink,RouterLinkActive],template:`
<div class="app-shell">
 <header class="site-header"><a routerLink="/" class="brand"><span class="brand-mark">M</span><span>MY <b>TRAVEL</b><small>DISCOVER MORE</small></span></a>
 <button class="mobile-menu" (click)="menuOpen=!menuOpen" aria-label="Open navigation">☰</button>
 <nav [class.open]="menuOpen"><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen=false">Home</a><a routerLink="/explore" routerLinkActive="active" (click)="menuOpen=false">Explore</a><a routerLink="/wishlist" routerLinkActive="active" (click)="menuOpen=false">Wishlist <span class="nav-count">{{wishlist.count()}}</span></a><a routerLink="/planner" routerLinkActive="active" (click)="menuOpen=false">Trip Planner</a></nav>
 <div class="header-actions"><button class="icon-button" (click)="profile.toggleTheme()" [attr.aria-label]="profile.profile().theme==='light'?'Enable dark mode':'Enable light mode'">{{profile.profile().theme==='light'?'☾':'☀'}}</button><a routerLink="/profile" class="profile-link"><img [src]="profile.profile().avatar" alt="Profile"/><span>My profile</span></a></div></header>
 <main class="main-content"><router-outlet /></main>
 <footer class="site-footer"><div class="footer-main"><a routerLink="/" class="brand brand-light"><span class="brand-mark">M</span><span>MY <b>TRAVEL</b><small>DISCOVER MORE</small></span></a><p>Find extraordinary places, collect meaningful moments and plan journeys worth remembering.</p><div class="footer-links"><a routerLink="/explore">Explore destinations</a><a routerLink="/wishlist">Your wishlist</a><a routerLink="/planner">Trip planner</a></div></div><div class="footer-bottom"><span>© {{year}} MY TRAVEL. Made for curious explorers.</span><span>Explore thoughtfully · Travel beautifully</span></div></footer>
 <div class="toast-stack" aria-live="polite"><div *ngFor="let notice of notifications.notices()" class="toast" [class.error]="notice.type==='error'"><span>{{notice.message}}</span><button (click)="notifications.dismiss(notice.id)" aria-label="Dismiss">×</button></div></div>
</div>`,styles:[`.mobile-menu{display:none}@media(max-width:760px){.site-header{position:relative}.mobile-menu{display:block}.site-header nav{display:none;position:absolute;top:72px;left:0;right:0;background:var(--surface);padding:20px;z-index:20;box-shadow:var(--shadow)}.site-header nav.open{display:grid}.header-actions .profile-link span{display:none}}`]})
export class AppComponent { readonly wishlist=inject(WishlistService); readonly profile=inject(ProfileService); readonly notifications=inject(NotificationService); menuOpen=false; year=new Date().getFullYear(); }
