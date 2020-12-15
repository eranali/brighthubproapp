import { Component, OnInit } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(private market: Market, private platform: Platform) { }

  ngOnInit() {
  }
  update(){
    if (this.platform.is('android')){
    this.market.open('com.brighthubpro.app');
    }
    if (this.platform.is('ios')){
      this.market.open('com.brighthubpro.app');
    }
  }
}
