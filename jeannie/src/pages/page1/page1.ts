import { Component, ViewChild } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  inputText = '';

  cards = [{
    id: 1,
    description: 'Reiniciar servidor Liberty SGO em desenvolvimento.',
    creation_date: '09/02/2017 12:23'
  }, {
      id: 2,
      description: 'Criar ambiente Liberty para a aplicação FRO em desenvolvimento.',
      creation_date: '10/02/2017 14:23'
    }, {
      id: 3,
      description: 'Passagem da aplicação FRO no Liberty em desenvolvimento.',
      creation_date: '10/02/2017 17:52'
    }, {
      id: 4,
      description: 'Criar ambiente Liberty para a aplicação FRO em desenvolvimento.',
      creation_date: '10/02/2017 14:23'
    }];

    loading: any;

    myApp: any = MyApp;

    @ViewChild('mainPage') mainPage;
    @ViewChild('cInputRequest') cInputRequest;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController) {



  }

  ngAfterViewChecked() {
    //this.scrollDown();
    // if (!this.isComponentsInitialized) {
    //   this.isComponentsInitialized = true;
    // this.cInputRequest.setFocus();
    // this.scrollDown();
    //alert(this.myApp.cards[0].description);
    //
    // }
  }

  ionViewDidEnter() {
    //alert(this.myApp.cards[0].description);
    this.scrollDown();
  }

  sendRequest() {
    var newCard = {
      id: 10,
      description: this.inputText,
      creation_date: new Date().toString()
    };
    this.cards.push(newCard);
    this.inputText = '';
    this.scrollDown();
    this.loading = this.loadingCtrl.create({
          content: 'Carregando...'
      });
    this.loading.present();
    setTimeout(2000);
    this.loading.dismiss();
    this.clickCard(this.cards.length-1);
  }

  scrollDown() {
    this.mainPage.scrollToBottom(1000);
    //this.cInputRequest.setFocus();
    // setTimeout(() => {
    //   this.cInputRequest.setFocus();
    // }, 150);

  }

  clickCard(i) {
    var myApp: any = MyApp;
    myApp.selectedCard = this.cards[i];
    this.navCtrl.push(Page2);
  }

}
