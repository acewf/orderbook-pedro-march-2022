import Socket from './SocketConnector'
import {
  BookItem, OrderBook, WsResponse,
  WorkerIncomeMessage
} from '../types';
import {
  BOOK_SNAPSHOT, BOOK_ID,
  EMPTY_BOOK, SUBSCRIBED_EVENT,
  SUBSCRIBE_EVENT, INFO_EVENT,
  SWAP, START, PAUSE
} from '../constants'
import { bookConverter, bookUpdater } from './helper';

const ctx: Worker = self as unknown as Worker;
let connection: Socket;
let bookInstance: OrderBook = EMPTY_BOOK;

function processMessages(data: WsResponse): OrderBook {
  let asks: Array<BookItem> = bookInstance.asks || [];
  let bids: Array<BookItem> = bookInstance.bids || [];

  switch (data.feed) {
    case BOOK_SNAPSHOT:
      asks = bookConverter(data.asks, true);
      bids = bookConverter(data.bids, false);

      break;
    case BOOK_ID:
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
  const data: WsResponse = JSON.parse(ev.data);
  switch (data.event) {
    case INFO_EVENT:
      postMessage(data);
      break;
    case SUBSCRIBED_EVENT:
      postMessage(bookInstance);
      break;
  }
  if (data.event) return;

  const precessedBook: OrderBook = processMessages(data);
  bookInstance = precessedBook;
  postMessage(precessedBook);
}

ctx.addEventListener('message', ({ data = {} }: MessageEvent) => {
  const { type, uri, product }: WorkerIncomeMessage = data;
  switch (type) {
    case START:
      bookInstance = EMPTY_BOOK;
      connection = new Socket(uri, {
        event: SUBSCRIBE_EVENT,
        feed: BOOK_ID,
        product_ids: [product]
      })
      connection.addEventListener('message', onMessage);
      return;
    case SWAP:
      bookInstance = EMPTY_BOOK;
      connection.close();
      connection = new Socket(uri, {
        event: SUBSCRIBE_EVENT,
        feed: BOOK_ID,
        product_ids: [product]
      })
      connection.addEventListener('message', onMessage);
      return;
    case PAUSE:
      connection.close();
      return;
  }
});

export default ctx;
