import { Component, OnInit } from '@angular/core';
import { REF, TOKEN_KEY } from '../../../config';
import { CommonUiElement } from './../app.commonelements';
import { RestService } from './../service/';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { NavigationExtras, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
  content: any;
  contentt: any;
  text: any;
  text2: any;
  text3: any;
  newImage: any = [];
  image: string;
  title: string;
  tittle: string;

  constructor(private rest: RestService, private router: Router, private cue: CommonUiElement, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.tittle = '';

    this.text = 'Hi, NetFlow is the app, when it comes to approaching and selling  to new prospects! Here\'s the quick intro on your phone and use this link to directly get the app now!\n';
    this.text2 = 'Hi Introducing the most generous loyalty program ever and it\'s included with the extra convenience of Flownet! Up to 30% back in cash, here\'s the details:Get onNetflow today and start making money now!\n';
    this.text3 = 'Hi , I joined a company called NetFlow, a friend recommended to me and I am so thankful! Here’s a snapshot of what it looks like, when I watched it, I thought of you so figured I’d share the quick intro.There is a short video. It’s worked well for me and might for you too. I’ll call you this weekend and we can discuss how this can help you in a time like this. Stay healthy and safe out there.\n';
  }

  copyText(val) {
    this.contentt = val;
    this.cue.showToast('Copied into box');
  }

  async share() {
    if (this.image === '' || this.image == null || this.image === 'undefined') {
      this.cue.showToast('Select an image');
    } else {
      this.cue.presentLoading('loading...');
      let message = this.content ? this.content : '';
      const token = await Storage.get({ key: REF });
      const Link = 'https://app.brighthubpro.co/?ref=' + token.value;

      if (message === '') {
        message = 'I would like to invite you to download Netflow App.\nSign up using my code:' + token.value + '. to join the affiliate marketing community. Get the app\n: ' + Link;
      } else {
        message = message + '.\nGet Netflow app\n Link: ' + Link + '\n or Sign up using my code:' + token.value;
      }
      this.newImage = ['www/' + this.image];
      this.socialSharing.share(message, null, this.newImage, Link);
    }
  }

  view(image) {
    // this.photoViewer.show('www/' +image);
  }

}
