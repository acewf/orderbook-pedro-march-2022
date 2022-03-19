import { useRef, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import throttle from 'just-throttle';
import { FpsView } from "react-fps";

import { OrderBook, MessageStruct } from '../types';
import {
  CLOSED_CONNECTION, ERROR_CONNECTION,
  EVENT_SUBSCRIBED, INFO_EVENT,
  EMPTY_BOOK,
  SWAP, START, PAUSE,
  NEXT_PUBLIC_WS_URI,
  BTC_MESSAGE, ETH_MESSAGE
} from '../constants';

import Book from '../components/Book';

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

const Home: NextPage = () => {
  const workerRef = useRef<Worker>();
  const [bookData, setBookData] = useState<OrderBook>(EMPTY_BOOK);
  const throttleRef = useRef(throttle((bookValue: OrderBook) => setBookData(bookValue), 1));

  const toggleProduct = () => {
    if (bookData.product_id === BTC_MESSAGE.product) {
      workerRef.current?.postMessage(ETH_MESSAGE);
    } else {
      workerRef.current?.postMessage({
        ...BTC_MESSAGE,
        type: SWAP
      });
    }
  }

  const pauseRender = () => {
    workerRef.current?.postMessage({
      type: PAUSE
    });
  }

  const resumeRender = () => {
    if (bookData.product_id === BTC_MESSAGE.product) {
      workerRef.current?.postMessage(BTC_MESSAGE);
    } else {
      workerRef.current?.postMessage(ETH_MESSAGE);
    }
  }

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/worker.ts', import.meta.url)
    );

    workerRef.current.addEventListener('message', ({ data }: MessageEvent) => {
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
          const newBook: OrderBook = data;
          newBook.asks = newBook.asks.slice(0, 16);
          newBook.bids = newBook.bids.slice(0, 16);
          throttleRef.current(newBook)
          break;
      }
    });

    workerRef.current.postMessage(BTC_MESSAGE);
    window.addEventListener('blur', pauseRender);
    window.addEventListener('focus', resumeRender);

    return () => {
      window.removeEventListener('blur', pauseRender);
      window.removeEventListener('focus', resumeRender);
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-white w-full h-full min-h-screen flex justify-center items-center">
      <Head>
        <title>{bookData.product_id} Order book</title>
        <meta name="description" content="Order book" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {workerRef.current && (
        <FpsView />
      )}

      <main className='w-full max-w-5xl mx-auto'>
        <div className='p-2 w-full text-center'>
          <h1>
            Order book by <span className="text-red-300">Pedro Martins</span>
          </h1>
          <span>Product: {bookData.product_id}</span>
        </div>

        <Book {...bookData} onClick={toggleProduct} />
      </main>
    </div>
  )
}

export default Home
