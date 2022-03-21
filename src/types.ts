import { MouseEventHandler } from 'react';

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
}

export interface IBook extends OrderBook {
  onClick: MouseEventHandler;
}

export interface BooksList {
  entries: Array<BookItem>;
  maxTotal: number;
  isAsks: boolean;
}

export type Message = {
  show: boolean;
  info?: string;
}

export interface IMessage extends Message {
  onClick: MouseEventHandler;
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
  version?: number;
  feed?: string;
  product_ids: Array<string>;
  product_id: string;
  asks: number[][];
  bids: number[][];
  numLevels: number;
}


export type WsResponseInfo = {
  event: string;
  version: number;
}

export type WorkerIncomeMessage = {
  type: string;
  uri: string,
  product: string;
}
