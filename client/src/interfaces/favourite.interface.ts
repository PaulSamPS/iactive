export interface IFavouriteInterface {
  _id: string;
  title: string;
  author: string;
  body: string;
  img: string;
  avatar: string;
  isFavourite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseFavouriteNews {
  _id: string;
  news: IFavouriteInterface[];
}
