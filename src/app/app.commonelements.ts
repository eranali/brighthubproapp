import {  LoadingController, ToastController, AlertController } from '@ionic/angular';
// import { TranslateService } from "@ngx-translate/core";
import { Injectable } from '@angular/core';


@Injectable()
export class CommonUiElement {
    loadingShown: boolean;
    private loading;

    constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
        this.loadingShown = false;
    }

   async presentLoading(content: any) {
        this.loading = await this.loadingCtrl.create({
            message: content,
            duration: (Math.random() * 1000) + 1000
        });
        this.loading.onDidDismiss(() => { });
        this.loading.present();
        this.loadingShown = true;
    }

    dismissLoading() {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    }

    async showToast(message: string, duration?: number, position?: any) {
        const toast = await this.toastCtrl.create({
            message,
            duration: (duration && Number(duration)) ? duration : 2000,
            position: position ? position : 'top'
        });
        toast.present();

        // toast.onDidDismiss(() => {console.log('Dismissed toast');});
    }

    async presentErrorAlert(msg: string) {
        // this.translate.get(['error', 'dismiss']).subscribe(text => {
        const alert = await this.alertCtrl.create({
            header: 'Error',
            subHeader: msg,
            buttons: ['Close']
        });
        await alert.present();
        // })
    }
    async presentSuccessAlert(msg: string) {
        // this.translate.get(['error', 'dismiss']).subscribe(text => {
        const alert = await this.alertCtrl.create({
            header: 'Success',
            subHeader: msg,
            buttons: ['Close']
        });
        await alert.present();
        // })
    }

    async presentNotificationAlert(msg: string) {
        // this.translate.get(['error', 'dismiss']).subscribe(text => {
        const alert = await this.alertCtrl.create({
            header: 'Notification',
            subHeader: msg,
            buttons: ['Close']
        });
        await alert.present();
        // })
    }

    compareDate(date1: Date, date2: Date): number {
        // With Date object we can compare dates them using the >, <, <= or >=.
        // The ==, !=, ===, and !== operators require to use date.getTime(),
        // so we need to create a new instance of Date with 'new Date()'
        const d1 = new Date(date1); const d2 = new Date(date2);

        // Check if the dates are equal
        const same = d1.getTime() === d2.getTime();
        if (same) { return 0; }

        // Check if the first is greater than second
        if (d1 > d2) { return 1; }

        // Check if the first is less than second
        if (d1 < d2) { return -1; }
    }


}
