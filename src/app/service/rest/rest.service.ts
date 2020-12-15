import { Injectable } from '@angular/core';
import { Api } from '../api/api.service';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: Api) { }

  getHomeData(userId){
    const data = {userid: userId };
    const seq = this.api.post('homedata', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }

  getPosts(){
    const seq = this.api.get('posts');
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getPostsByCategory(id){
    const seq = this.api.get('category_posts/' + id);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getFeatured(){
    const seq = this.api.get('featured');
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getCategories(){
    const seq = this.api.get('categories');
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getWithdraws(userId) {
    const data = { userid: userId };
    const seq = this.api.post('withdraws', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  storeWithdraw(amt, userId) {
    const data = {amount: amt, userid: userId};
    // console.log(data);
    const seq = this.api.post('store_withdraw', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getWallet(userId){
    const data = {userid: userId, type: 'Websites' };
    const seq = this.api.post('wallet', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getEarning(userId){
    const data = {userid: userId, type: 'Websites' };
    const seq = this.api.post('earnings', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getWebsites(userId){
    const data = {userid: userId, type: 'Websites' };
    const seq = this.api.post('subscriptions', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getBoosters(userId){
    const data = {userid: userId, type: 'Boosters' };
    const seq = this.api.post('subscriptions', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  sendMessage(userName, userEmail, userMessage){
    const data = {name: userName, email: userEmail, message: userMessage };
    const seq = this.api.post('sendmessage', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  seenNoti(ID){
    const data = {id: ID};
    const seq = this.api.post('seen_noti', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getNoti(ID){
    const data = {id: ID };
    const seq = this.api.post('get_noti', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getNotifications(userId){
    const data = {userid: userId };
    const seq = this.api.post('notifications', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getVersion(version, dev){
    const data = {version, device: dev };
    const seq = this.api.post('appversion', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  updateUserData(fName, lName, Tel, addr, token) {
    const data = { fname: fName, lname: lName,   userid: token, tel: Tel , address: addr };
    const seq = this.api.post('updateuserdata', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  updatePassword(pass, token) {
    const data = { password: pass, userId: token };
    const seq = this.api.post('updatepassword', data);
    seq.subscribe((res: any) => {  }, err => { console.error('ERROR', err); });
    return seq;
  }
  getUser(token) {
    const data = { userid: token };
    const seq = this.api.post('getuserdata', data);
    seq.subscribe((res: any) => {
    }, err => { console.error('ERROR', err); });
    return seq;
  }
}
