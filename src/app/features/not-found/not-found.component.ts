import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({selector:'app-not-found',standalone:true,imports:[RouterLink],template:`<section class="empty-state page-section"><span>404</span><h1>This path is <em>uncharted.</em></h1><p>We couldn't find the page you were looking for.</p><a routerLink="/" class="btn btn-primary">Back to home →</a></section>`})
export class NotFoundComponent {}
