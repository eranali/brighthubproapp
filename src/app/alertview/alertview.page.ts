import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alertview',
  templateUrl: './alertview.page.html',
  styleUrls: ['./alertview.page.scss'],
})
export class AlertviewPage implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() message: string;
  @Input() image: string;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
