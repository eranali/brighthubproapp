import { Component } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
// import { ModalController } from 'ionic-angular';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slice: number;
  hideMe: boolean;
  data: any;
  message: any;
  currentEarning = 0;
  totalPayout = 0;
  constructor(private rest: RestService, private router: Router, private cue: CommonUiElement, private iab: InAppBrowser) { }
  ionViewWillEnter() {
    this.slice = 10;
    this.hideMe = true;
    this.getEarnings();
    this.getWallet();
  }

  async getEarnings() {
    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getEarning(token.value).subscribe((resp: any) => {
      this.hideMe = false;
      if (resp.status === 'error') {
        this.message = resp.message;
        this.data = [];
      } else {
        this.message = '';
        this.data = resp;
      }
    }, (err) => {
      this.hideMe = false;
      console.log(err);
    });
  }

  async getWallet() {
    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getWallet(token.value).subscribe((resp: any) => {
      this.hideMe = false;
      // console.log(data);
      if (resp.status === 'error') {
        // this.message = data["message"];
        this.currentEarning = 0;
        this.totalPayout = 0;
      } else {
        this.message = '';
        this.currentEarning = resp[0].balance;
        this.totalPayout = resp[0].payout;

      }
    });
  }

  setDate(date) {
    const newdate = date.replace(/\s/g, 'T');
    return new Date(newdate);
  }

  doInfinite(event) {
    setTimeout(() => {
      event.target.complete();
      this.slice += 5;
    }, 2000);
  }
  gotoWithdraw() {
    this.router.navigateByUrl('/withdraw');
  }
}
