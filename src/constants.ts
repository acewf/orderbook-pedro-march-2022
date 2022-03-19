import { OrderBook } from './types';

export const INFO_EVENT: string = 'info';
export const EVENT_SUBSCRIBED: string = 'subscribed';
export const BOOK_SNAPSHOT: string = 'book_ui_1_snapshot';
export const BOOK_DELTA: string = 'book_ui_1';


export const CLOSED_CONNECTION: string = 'closed';
export const ERROR_CONNECTION: string = 'error';

export const EMPTY_BOOK: OrderBook = {
  asks: [],
  bids: [],
  product_id: '',
  levels: 0,
  maxTotal: 0
}
