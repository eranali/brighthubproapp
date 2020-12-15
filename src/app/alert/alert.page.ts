import { Component, OnInit } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
import { ModalController } from '@ionic/angular';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { AlertviewPage } from '../alertview/alertview.page';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  slice: number;
  hideMe: boolean;
  noti: any;
  message: any;

  constructor(private rest: RestService, private cue: CommonUiElement, public modalCtrl: ModalController) { }
  ionViewWillEnter() {
    this.slice = 15;
    this.hideMe = true;
  }
  ngOnInit() {
    this.getnotifications();
  }

  async getnotifications() {

    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getNotifications(token.value).subscribe((data: any) => {
      this.hideMe = false;
      if (data.status === 'error') {
        this.message = data.message;
        this.noti = [];
      } else {
        this.message = '';
        this.noti = data;
      }
    }, (err) => {
      this.hideMe = false;
    });
  }

  async view(ID, Title, msg, img){
  this.rest.seenNoti(ID).subscribe((resp) => { console.log(resp); });
  const modal = await this.modalCtrl.create({
      component: AlertviewPage,
      cssClass: 'modal-class',
      swipeToClose: true,
      componentProps: {
        id: ID,
        title: Title,
        message: msg,
        image: img
      }
    });
  return await modal.present();
}



doInfinite(event) {
  setTimeout(() => {
    event.target.complete();
    this.slice += 5;
  }, 2000);
}


}
