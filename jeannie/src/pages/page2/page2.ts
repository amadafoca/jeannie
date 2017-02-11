import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Page1 } from '../page1/page1';
import { MyApp } from '../../app/app.component';
import { Mensagem } from '../../app/entidades';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  conversation: Mensagem[];

  inputText = '';

  img_assistente: string = "img/avatar-ts-jeannie.png";
  img_usuario: string = "img/avatar-ts-ms.png";

  myApp: any = MyApp;

  loading: any;

  @ViewChild('page2') page2;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');



    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.conversation = [];

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }

  ngAfterContentInit() {
    //this.inputText = this.myApp.selectedThread.text;
    //this.newMessage();
    this.scrollDown();
  }

  scrollDown() {
    this.page2.scrollToBottom(1000);
  }

  newMessage() {
    this.loading = this.loadingCtrl.create({
          content: 'Carregando...'
      });
    this.loading.present();
    setTimeout(500);
    this.conversation.push(new Mensagem([this.inputText], true, false));
    this.loading.dismiss();
  }
}
