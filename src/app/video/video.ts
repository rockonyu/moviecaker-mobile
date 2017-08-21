export class Video {
  Id: string;
  Name: string;
  ENName: string;
  CNName: string;
  OtherName: string;
  Intro: string;
  CNIntro: string;
  Picture: string;
  PosterUrl: string;
  BannerUrl: string;
  Ratings_IMDB: number;
  Ratings_Douban: number;
  AverageRatings: number;
  IsPlayable: boolean;
  HotPoint: number;
  TopPoint: number;
  ReleaseDate: string;
  CreatedOn: string;
}

export class Category {
  ID: string;
  Name: string;
}
