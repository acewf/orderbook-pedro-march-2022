export type BookItem = {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  asks: Array<BookItem>;
  bids: Array<BookItem>;
  product_id: string;
  levels: number;
  maxTotal: number;
}

export interface BooksList {
  entries: Array<BookItem>;
  maxTotal: number;
  isAsks: boolean;
}

export type MessageStruct = {
  type: string,
  uri: string,
  product: string
}

export type WsMessage = {
  event: string;
  feed: string;
  product_ids: Array<string>;
}


export type WsResponse = {
  event: string;
  feed: string;
  product_id: string;
  asks: number[][];
  bids: number[][];
  numLevels: number;
}


export type WsResponseInfo = {
  event: string;
  version: number;
}
