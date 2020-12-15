import { Component } from '@angular/core';
import {  User } from './../service/';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor( private router: Router, public user: User) {}

  async logout() {
    await this.user.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async terms() {
    this.router.navigateByUrl('/terms');
  }
  async gotoAbout() {
    this.router.navigateByUrl('/about');
  }
  async gotoContact() {
    this.router.navigateByUrl('/contact');
  }
}
