export interface List {
  userId: number;
  id: number;
  title?: string;
  body?: string;
  comments?: Card[];
}

export interface Card {
  postId: number;
  id: number;
  name?: string;
  email?: string;
  body?: string;
}
