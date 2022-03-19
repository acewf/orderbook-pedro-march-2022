import { OrderBook, MessageStruct } from './types';

export const NEXT_PUBLIC_WS_URI = process.env.NEXT_PUBLIC_WS_URI;
export const INFO_EVENT: string = 'info';
export const EVENT_SUBSCRIBED: string = 'subscribed';
export const BOOK_SNAPSHOT: string = 'book_ui_1_snapshot';
export const BOOK_DELTA: string = 'book_ui_1';


export const CLOSED_CONNECTION: string = 'closed';
export const ERROR_CONNECTION: string = 'error';

export const SWAP: string = 'swap';
export const START: string = 'start';
export const PAUSE: string = 'pause';

export const EMPTY_BOOK: OrderBook = {
  asks: [],
  bids: [],
  product_id: '',
  levels: 0,
}

const BTC_MESSAGE: MessageStruct = {
  type: START,
  uri: NEXT_PUBLIC_WS_URI || '',
  product: 'PI_XBTUSD'
}

const ETH_MESSAGE: MessageStruct = {
  type: SWAP,
  uri: 'wss://www.cryptofacilities.com/ws/v1',
  product: 'PI_ETHUSD'
}


