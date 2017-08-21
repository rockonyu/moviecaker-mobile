import { Video } from '../video/video';
import { ReviewUser } from '../user/user';

export class Review {
  Id: number;
  Content: string;
  TopPoint: number;
  HotPoint: number;
  Video: Video;
  User: ReviewUser;
  CreatedOn: string;
  ModifiedOn: string;
}

export class OtherReviews {
  Reviews: Review[] = [];
  Total: number = 0;
}
