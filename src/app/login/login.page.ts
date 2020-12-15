import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { oneSignalAppId, senderId } from '../../../config';
import { CommonUiElement } from './../app.commonelements';
import { User } from './../service/';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private dologin: FormGroup;
  public loginForm: any;

  constructor(
    public user: User,
    private cue: CommonUiElement,
    private oneSignal: OneSignal,
    public formBuilder: FormBuilder,
    private router: Router,
    public navCtrl: NavController
  ) {
    this.dologin = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    /*this.dologin = new FormGroup({
      email: new FormControl( Validators.required),
      password: new FormControl(Validators.minLength(6), Validators.required)
   });*/
  }
  validationmessages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    lastname: [
      { type: 'required', message: 'Last name is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    tel: [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'minlength', message: 'The Mobile Number must be 11 characters long.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],

    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };
  ngOnInit() {
  }

  async doLogin() {
    const email = this.dologin.value.email;
    const password = this.dologin.value.password;
    // console.log(password);
    this.cue.presentLoading('authenticating...');
    // const pushid = '12345';
    this.oneSignal.startInit(oneSignalAppId, senderId);
    this.oneSignal.getIds().then(result => {
    const pushid = JSON.stringify(result.userId);
    this.user.login({ email, password, pushid }).subscribe(
      async (res) => {
        // console.log({ email, password, pushid });
        // console.log(res[0].status);
        this.cue.dismissLoading();
        if (res[0].status === 'active') {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          const msg = res[0].message;
          this.cue.presentErrorAlert(msg);
        }
      },
      async (res) => {
        console.log(res);
        this.cue.dismissLoading();
        const msg = 'Error! Something went wrong.';
        this.cue.showToast(msg);
      }
    );
    });

    this.oneSignal.endInit();

    /*
      this.user.login(password, email, pushid).subscribe((resp) => {
        this.cue.dismissLoading();
        // console.log(resp["status"]);
        if (resp.status === 'error') {
          const msg = resp.message;
          this.cue.showToast(msg);
        }
        else if (resp[0].status === 'active') {

          this.storage.set('email', resp[0].email).then(() => {
            this.storage.get('email').then((value) => {
              this.email = value;
            });
          });

          this.storage.set('fname', resp[0].first_name).then(() => {
            this.storage.get('fname').then((value) => { });
          });

          this.storage.set('tel', resp[0].tel).then(() => {
            this.storage.get('tel').then((value) => {

            });
          });

          this.storage.set('address', resp[0].address).then(() => {
            this.storage.get('address').then((value) => {

            });
          });
          this.storage.set('businessref', resp[0].businessRefID).then(() => {
            this.storage.get('businessref').then((value) => {
            });
          });

          this.storage.set('affiliate', resp[0].affiliate_id).then(() => {
            this.storage.get('affiliate').then((value) => {
            });
          });


          this.storage.set('accountid', resp[0].accountid).then(() => {
            this.storage.get('accountid').then((value) => {

            });
          });
          this.storage.set('picture', resp[0].picture).then(() => {
            this.storage.get('picture').then((value) => {

            });
          });
          this.storage.set('trial', resp[0].trial).then(() => {
            this.storage.get('trial').then((value) => {

            });
          });
          this.storage.set('expire', resp[0].expire_date).then(() => {
            this.storage.get('expire').then((value) => {

            });
          });
          // this.storeLocation(resp[0].accountid);
          this.storage.set('loggedin', '1');
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.cue.dismissLoading();
          const msg = resp.message;
          this.cue.showToast(msg);
        }
      }, (err) => {

        this.cue.dismissLoading();
        const msg = 'Error! Something went wrong.';
        this.cue.presentErrorAlert(msg);
      });
    });

    this.oneSignal.endInit();*/
  }


  openResetPassword() {
    // this.navCtrl.push(ResetpasswordPage);

  }
  signup() {
    //  this.navCtrl.push(SignupPage);
  }

  gotoHome() {
    // this.router.navigateByUrl('/home', { replaceUrl: true });
    this.navCtrl.navigateRoot('/home');
  }


}
