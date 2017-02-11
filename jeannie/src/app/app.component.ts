import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { JeannieService } from '../services/services';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private jeannieService: JeannieService = new JeannieService();

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  selectedThread = 0;

  constructor(public platform: Platform) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Pessoal', component: Page1 },
      { title: 'GSAP', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.jeannieService.open();
      this.jeannieService.onOpen((e) => {
        var boardId = 42;
        // this.jeannieService.send('board-subscribe', { 'board-id': '${boardId}' });
        this.jeannieService.send('thread-create', {'text' : 'Minha primeira thread'});
        this.jeannieService.onMessage((data) => {
          alert(JSON.stringify(data));
        })
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    window.alert(page.component);
    this.nav.setRoot(page.component);
  }
}
