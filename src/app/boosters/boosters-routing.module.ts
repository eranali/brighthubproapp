import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoostersPage } from './boosters.page';

const routes: Routes = [
  {
    path: '',
    component: BoostersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoostersPageRoutingModule {}
