import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertviewPageRoutingModule } from './alertview-routing.module';

import { AlertviewPage } from './alertview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertviewPageRoutingModule
  ],
  declarations: [AlertviewPage]
})
export class AlertviewPageModule {}
