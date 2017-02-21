import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { JeannieService } from '../services/services';

import { Card, Chat } from './entidades';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  jeannieService: JeannieService = new JeannieService();
  selectedCard = 0;
  cards: Card[];

  constructor(public platform: Platform) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Requisições', component: Page1 },
      { title: 'Detalhe', component: Page2 }
    ];

    this.cards = [];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // this.loadCards();
      // this.createCard();
      this.loadCardsMock();
      //alert('initapp');

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    window.alert(page.component);
    this.nav.setRoot(page.component);
  }

  loadCardsMock() {
    var chats;
    chats = new Chat('Confirma?', 'question', [], '');
    this.cards.push(
      new Card(1, 'Reiniciar servidor Liberty SGO em desenvolvimento.',
      chats, Date.now(), Date.now(), 'started')
    );
  }

  loadCards() {
    this.jeannieService.open();
    this.jeannieService.onOpen((e) => {
      var action = "get-board";
      // this.jeannieService.send('board-subscribe', { 'board-id': '${boardId}' });
      this.jeannieService.send(action, {});
      this.jeannieService.onMessage((data) => {
        //preencher o this.cards com base no data
        // alert(JSON.stringify(data));
        this.cards.push(
          new Card(1, 'Reiniciar servidor Liberty SGO em desenvolvimento.',
          ['1 comentario'], Date.now(), Date.now(), 'started')
        );
      })
    });
  }

  createCard() {
    this.jeannieService.open();
    this.jeannieService.onOpen((e) => {
      var action = "create-request";
      var description = "teste cation create-request";
      // this.jeannieService.send('board-subscribe', { 'board-id': '${boardId}' });
      this.jeannieService.send(action, description);
      this.jeannieService.onMessage((data) => {
        alert(JSON.stringify(data));
      })
    });

  }

}
