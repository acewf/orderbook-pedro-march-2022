import { useRef, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import throttle from 'just-throttle';

import { OrderBook, BookItem, MessageStruct } from '../types';
import {
  CLOSED_CONNECTION, ERROR_CONNECTION,
  EVENT_SUBSCRIBED, INFO_EVENT,
  EMPTY_BOOK
} from '../constants';

import Book from '../components/Book';

const initialMessage: MessageStruct = {
  type: 'start',
  uri: 'wss://www.cryptofacilities.com/ws/v1',
  product: 'PI_XBTUSD'
}

const Home: NextPage = () => {
  const workerRef = useRef<Worker>();
  const [bookData, setBookData] = useState<OrderBook>(EMPTY_BOOK);
  const throttleRef = useRef(throttle((bookValue: OrderBook) => setBookData(bookValue), 100));

  const calcBookTotal = (newBook: OrderBook) => {
    const lastAsk: BookItem = newBook.asks[newBook.asks.length - 1];
    const lastBid: BookItem = newBook.bids[newBook.bids.length - 1]

    newBook.maxTotal = Math.max(lastAsk.total, lastBid.total);

    throttleRef.current(newBook)
  }

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/worker.ts', import.meta.url)
    );

    workerRef.current.addEventListener('message', ({ data }: MessageEvent) => {
      console.log(data);
      switch (data.event) {
        case CLOSED_CONNECTION:

          break;
        case ERROR_CONNECTION:

          break;
        case EVENT_SUBSCRIBED:

          break;
        case INFO_EVENT:

          break;

        default:
          calcBookTotal(data);
          break;
      }
    });

    workerRef.current.postMessage(initialMessage);

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  return (
    <div className="text-white w-full h-full min-h-screen flex justify-center items-center">
      <Head>
        <title>Order book</title>
        <meta name="description" content="Order book" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-full max-w-5xl mx-auto'>
        <div className='p-2 w-full text-center'>
          <h1>
            Order book by <span className="text-red-300">Pedro Martins</span>
          </h1>
        </div>

        <Book {...bookData} />
      </main>
    </div>
  )
}

export default Home
