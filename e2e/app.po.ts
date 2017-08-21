import { browser, by, element } from 'protractor';

export class MovieCaker.MobilePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
