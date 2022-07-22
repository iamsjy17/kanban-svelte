export interface List {
  id: string;
  pos: number;
  title: string;
}

export interface Card {
  id: string;
  listId: string;
  pos: number;
  name: string;
  color?: string;
}
