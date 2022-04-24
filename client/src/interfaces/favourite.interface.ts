export interface IFavouriteInterface {
  id: number;
  title: string;
  author: string;
  body: string;
  img: string;
  avatar: string;
}

export interface IResponseFavouriteNews {
  id: number;
  news: IFavouriteInterface[];
}
