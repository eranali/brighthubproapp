import { Component, OnInit } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
// import { ModalController } from 'ionic-angular';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-boosters',
  templateUrl: './boosters.page.html',
  styleUrls: ['./boosters.page.scss'],
})
export class BoostersPage implements OnInit {
  slice: number;
  hideMe: boolean;
  data: any;
  message: any;
  constructor(private rest: RestService, private cue: CommonUiElement, private iab: InAppBrowser) { }
  ionViewWillEnter() {
    this.slice = 10;
    this.hideMe = true;
  }
  ngOnInit() {
    this.getWebsites();
  }

  async getWebsites() {

    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getBoosters(token.value).subscribe((resp: any) => {
      this.hideMe = false;
      // console.log(resp);
      if (resp.status === 'error') {
        this.message = resp.message;
        this.data = [];
      } else {
        this.message = '';
        this.data = resp;
      }
    }, (err) => {
      this.hideMe = false;
    });
  }


  doInfinite(event) {
    setTimeout(() => {
      event.target.complete();
      this.slice += 5;
    }, 2000);
  }


  async buy() {
    const token = await Storage.get({ key: TOKEN_KEY });
    const browser = this.iab.create('https://api.brighthubpro.com/v1/boosters/' + token.value);
  }
}
