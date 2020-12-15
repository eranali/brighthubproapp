import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { TabsPageModule } from './../tabs/tabs.module';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },{
    path: 'home',
    component: TabsPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
