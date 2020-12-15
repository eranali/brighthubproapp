import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { oneSignalAppId, senderId } from '../../config';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { RestService } from './service/rest/rest.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private deeplinks: Deeplinks,
    public rest: RestService,
    private appVersion: AppVersion,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.oneSignal.startInit(oneSignalAppId, senderId);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.endInit();
      this.deepLinks();
      this.getVersion();
    });
  }
  deepLinks() {
    this.deeplinks.route({
      // '/category': Tab2Page,
      // '/search': SearchPage,
      // '/post/:title/:content/:img/:url/:cate': PostPage
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

  getVersion() {

    this.appVersion.getVersionNumber().then((version) => {
      if (this.platform.is('android')){
        this.rest.getVersion(version, 'android').subscribe((data: any) => {
          if (data.status === true) {
            this.router.navigate(['/update']);
          }
        });
      }
      if (this.platform.is('ios')){
        this.rest.getVersion(version, 'ios').subscribe((data: any) => {
          if (data.status === true) {
            this.router.navigate(['/update']);
          }
        });
      }
    });
  }
}
