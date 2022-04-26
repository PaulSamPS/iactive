export interface IFavouriteInterface {
  id: number;
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
  id: number;
  news: IFavouriteInterface[];
}
