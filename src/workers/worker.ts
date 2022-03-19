import Socket from './SocketConnector'
import { BookItem, OrderBook, WsResponse } from '../types';
import {
  BOOK_SNAPSHOT, BOOK_DELTA,
  EMPTY_BOOK, EVENT_SUBSCRIBED,
  SWAP, START, PAUSE
} from '../constants'
import { bookConverter, bookUpdater } from './helper';

const ctx: Worker = self as unknown as Worker;
let connection: Socket;
let bookInstance: OrderBook = EMPTY_BOOK;

function processMessages(data: (WsResponse)): OrderBook {
  if (!data.feed || data.event === EVENT_SUBSCRIBED) {
    return bookInstance;
  }

  let asks: Array<BookItem> = bookInstance.asks || [];
  let bids: Array<BookItem> = bookInstance.bids || [];

  switch (data.feed) {
    case BOOK_SNAPSHOT:
      asks = bookConverter(data.asks, true);
      bids = bookConverter(data.bids, false);

      break;
    case BOOK_DELTA:
      asks = bookUpdater(asks, data.asks, true)
      bids = bookUpdater(bids, data.bids, false)
      break;

    default:
      break;
  }

  return {
    asks,
    bids,
    product_id: data.product_id,
    levels: data.numLevels ? data.numLevels : bookInstance.levels
  };
}


function onMessage(ev: MessageEvent): void {
  const data = JSON.parse(ev.data);
  if (data.event) {
    postMessage(data);

    return;
  }

  const precessedBook: OrderBook = processMessages(data);
  bookInstance = precessedBook;
  postMessage(precessedBook);
}

ctx.addEventListener('message', ({ data = {} }: MessageEvent) => {
  const { type, uri, product } = data;
  console.log(type, product)
  switch (type) {
    case START:
      bookInstance = EMPTY_BOOK;
      connection = new Socket(uri, {
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [product]
      })
      connection.addEventListener('message', onMessage);
      return;
    case SWAP:
      bookInstance = EMPTY_BOOK;
      connection.close();
      connection = new Socket(uri, {
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [product]
      })
      connection.addEventListener('message', onMessage);
      return;
    case PAUSE:
      connection.close();
      return;
  }
});
