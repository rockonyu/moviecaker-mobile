import { MovieCaker.MobilePage } from './app.po';

describe('movie-caker.mobile App', () => {
  let page: MovieCaker.MobilePage;

  beforeEach(() => {
    page = new MovieCaker.MobilePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
