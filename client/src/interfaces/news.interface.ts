export interface INewsInterface {
  id: number;
  title: string;
  author: string;
  body: string;
  img: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseNews {
  count: number;
  rows: INewsInterface[];
}
