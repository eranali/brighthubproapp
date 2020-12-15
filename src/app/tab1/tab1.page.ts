import { Component } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  websites: any = 0;
  booster: any = 0;
  rents: any = '$0.00';
  referrals: any = 0;
  token: any;
  alerts: any = 0;
  constructor(private rest: RestService, private router: Router, private cue: CommonUiElement, private iab: InAppBrowser) { }

  ionViewWillEnter() {
    this.getHomeData();
    this.getAlerts();
  }

  async getHomeData() {
    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getHomeData(token.value).subscribe((resp: any) => {
      // console.log(resp);
      this.websites = resp.websites;
      this.booster = resp.boosters;
      this.rents = resp.rents;
      this.referrals = resp.referrals;
    });
  }

  async getAlerts() {
    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getNotifications(token.value).subscribe((resp: any) => {
      this.alerts = resp.length;
    });
  }

  async gotoWebsite() {
    await this.router.navigateByUrl('/websites');
  }
  async gotoBooster() {
    await this.router.navigateByUrl('/boosters');
  }
  async gotoEarnings() {
    await this.router.navigateByUrl('/tabs/tab2');
  }
  async gotoReferral() {
    await this.router.navigateByUrl('/tabs/tab4');
  }
  async buyWebsite() {
    const token = await Storage.get({ key: TOKEN_KEY });
    const browser = this.iab.create('https://api.brighthubpro.com/v1/websites/' + token.value);
  }

  async buyBooster() {
    const token = await Storage.get({ key: TOKEN_KEY });
    const browser = this.iab.create('https://api.brighthubpro.com/v1/boosters/' + token.value);
  }

}
