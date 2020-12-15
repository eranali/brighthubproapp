import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertviewPage } from './alertview.page';

const routes: Routes = [
  {
    path: '',
    component: AlertviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertviewPageRoutingModule {}
