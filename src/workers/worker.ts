import Socket from './SocketConnector'
import { BookItem, OrderBook, WsResponse } from '../types';
import { BOOK_SNAPSHOT, BOOK_DELTA, EMPTY_BOOK, EVENT_SUBSCRIBED } from '../constants'

const ctx: Worker = self as unknown as Worker;
let connection: Socket;
let bookInstance: OrderBook = EMPTY_BOOK;

function bookConverter(data: number[][]): Array<BookItem> {
  let totalSize = 0;
  return data.map(([price, size]) => {
    totalSize += size;
    const entry: BookItem = {
      price,
      size,
      total: totalSize
    }
    return entry;
  });
}

function bookUpdater(entries: Array<BookItem>, data: number[][]): Array<BookItem> {
  const newEntries = [...entries];
  data.forEach(([price, newSize]) => {
    const entryIndex = newEntries.findIndex((entry) => (entry.price === price));
    if (Boolean(~entryIndex)) {
      newEntries[entryIndex].size = newSize;
    } else {
      const entry: BookItem = {
        price,
        size: newSize,
        total: 0
      }
      newEntries.push(entry)
    }
  })

  const filteredEntries = newEntries.filter(({ size }) => size > 0);
  let totalSize = 0;

  return filteredEntries.map(({ size, price }) => {
    totalSize += size;
    const entry: BookItem = {
      price,
      size,
      total: totalSize
    }
    return entry;
  });
}

function processMessages(data: (WsResponse)): OrderBook {
  if (!data.feed || data.event === EVENT_SUBSCRIBED) {
    return bookInstance;
  }

  let asks: Array<BookItem> = bookInstance.asks || [];
  let bids: Array<BookItem> = bookInstance.bids || [];

  switch (data.feed) {
    case BOOK_SNAPSHOT:
      asks = bookConverter(data.asks.reverse());
      bids = bookConverter(data.bids.reverse());

      break;
    case BOOK_DELTA:
      asks = bookUpdater(asks, data.asks.reverse())
      bids = bookUpdater(bids, data.bids.reverse())
      break;

    default:
      break;
  }

  return {
    asks,
    bids,
    product_id: data.product_id,
    levels: data.numLevels ? data.numLevels : bookInstance.levels,
    maxTotal: 0
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

ctx.addEventListener('message', (evt) => {
  const { data = {} } = evt;
  const { type, uri, product } = data;
  switch (type) {
    case 'start':
      bookInstance = EMPTY_BOOK;
      connection = new Socket(uri, {
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [product]
      })
      connection.addEventListener('message', onMessage);
      return;
  }
});
