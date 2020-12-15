import { Component, OnInit } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
// import { ModalController } from 'ionic-angular';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  slice: number;
  hideMe: boolean;
  data: any;
  message: any;
  private doadd: FormGroup;
  constructor(private rest: RestService, private router: Router, private cue: CommonUiElement, public formBuilder: FormBuilder) {
    this.doadd = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])]
    });
  }
  ionViewWillEnter() {
    this.slice = 10;
    this.hideMe = true;
    this.getWithdraws();
  }
  ngOnInit() {
  }

  async getWithdraws() {
    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.getWithdraws(token.value).subscribe((resp: any) => {
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

  async doAdd() {
    const amount = this.doadd.value.amount;
    this.cue.presentLoading('processing...');
    const token = await Storage.get({ key: TOKEN_KEY });
    this.rest.storeWithdraw(amount, token.value).subscribe((resp: any) => {
      this.cue.dismissLoading();
      // console.log(resp["status"]);
      if (resp.status === 'success') {
        this.cue.presentSuccessAlert(resp.message);
      } else {
        const msg = resp.message;
        this.cue.presentErrorAlert(msg);
      }
    }, (err) => {
      this.cue.dismissLoading();
      this.cue.presentErrorAlert('something went wrong');
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

}
