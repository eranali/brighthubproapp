import { Component, OnInit } from '@angular/core';
import { CommonUiElement } from './../app.commonelements';
import { RestService, User } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { TOKEN_KEY } from '../../../config';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  pass: any;
  cpass: any;
  constructor(
    private navCtrl: NavController,
    private rest: RestService,
    private router: Router,
    private cue: CommonUiElement, public user: User) { }

  ngOnInit() {
  }

  async doupdatepassword() {
    let msg;
    if (this.pass !== this.cpass) {
      msg = 'Password does not match';
      this.cue.showToast(msg);
    } else if (this.pass === '' || this.pass === 'undefined' || this.pass == null) {
      msg = 'Password can not be empty';
      this.cue.showToast(msg);
    }else if (this.cpass === '' || this.cpass === 'undefined' || this.cpass == null) {
      msg = 'Confirm Password can not be empty';
      this.cue.showToast(msg);
    }else if (this.pass.length < 6) {
      msg = 'Password must be minimum of 6 characters';
      this.cue.showToast(msg);
    }else {
      this.cue.presentLoading('saving...');

      const token = await Storage.get({ key: TOKEN_KEY });
      this.rest.updatePassword(this.pass, token.value).subscribe((resp: any) => {
        this.cue.dismissLoading();

        if (resp[0].status === 'success') {

          msg = 'Password was updated successfully';
          this.cue.presentErrorAlert(msg);
          this.user.logout();
          this.router.navigateByUrl('/', { replaceUrl: true });
        } else {
          msg = 'Error Occurred!';
          this.cue.presentErrorAlert(msg);
        }
      }, (err) => {
        this.cue.dismissLoading();
        msg = 'Error Occurred!';
        this.cue.presentErrorAlert(msg);

      });

    }

  }

  goBack() {
    this.navCtrl.pop();
  }

}
