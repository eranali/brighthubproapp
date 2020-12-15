import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CommonUiElement } from './app.commonelements';
import { RestService } from './service/rest/rest.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  User, Api } from './service/';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    CommonUiElement,
    RestService,
    HttpClient,
    User, Api,
    OneSignal,
    Deeplinks,
    Market,
    FirebaseX,
    InAppBrowser,
    AppVersion,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
