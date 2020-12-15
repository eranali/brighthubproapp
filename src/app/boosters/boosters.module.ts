import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoostersPageRoutingModule } from './boosters-routing.module';

import { BoostersPage } from './boosters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoostersPageRoutingModule
  ],
  declarations: [BoostersPage]
})
export class BoostersPageModule {}
