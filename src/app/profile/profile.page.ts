import { Component, OnInit } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string;
  address: string;
  picture: any;
  email: string;
  tel: string;
  constructor(private navCtrl: NavController, private rest: RestService, private router: Router, private cue: CommonUiElement) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser(){
    const token = await Storage.get({ key: TOKEN_KEY });
    await this.rest.getUser(token.value).subscribe((resp: any) => {
      this.name = resp.first_name + ' ' + resp.last_name;
      this.tel = resp.tel;
      this.email = resp.email;
      this.address = resp.address;
      this.picture =  resp.picture;
    });
  }

}
