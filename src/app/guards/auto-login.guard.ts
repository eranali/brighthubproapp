import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import {  User } from './../service/';
@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor( private router: Router, public user: User) {}
  canLoad(): Observable<boolean> {
    return this.user.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        console.log('Found previous token, automatic login');
        if (isAuthenticated) {
          // Directly open inside area
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
