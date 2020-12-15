import { Component, OnInit } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  name: string;
  email: string;
  message: string;
  constructor(private navCtrl: NavController, private rest: RestService, private router: Router, private cue: CommonUiElement, ) { }

  ngOnInit() {
  }

  sendMessage(){
    if (this.message === '' || this.name === '' || this.email === ''){
      this.cue.showToast('Check all fields, incomplete message');
    }else{
      this.cue.presentLoading('Sending...');
      this.rest.sendMessage(this.name, this.email, this.message).subscribe((resp: any) => {
        this.cue.dismissLoading();
        if (resp[0].status === 'success') {
          this.cue.presentSuccessAlert(resp[0].message);
          this.goBack();
        }else{
          this.cue.presentErrorAlert(resp[0].message);
        }
      });
    }
  }

  openlink(link){
    window.open(link);
  }
  goBack(){
    this.navCtrl.pop();
  }

}
