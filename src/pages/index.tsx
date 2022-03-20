import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import type { Message } from '../types';
import { SWAP, BTC_MESSAGE, ETH_MESSAGE } from '../constants';

import Book from '../components/Book';
import Warning from '../components/Warning';
import useWorker from '../hooks/useWorker';
import useBookData from '../hooks/useBookData';
import useAppFocus from '../hooks/useAppFocus';

const Home: NextPage = () => {
  const { bookData, updateBook } = useBookData();
  const [message, setMessage] = useState<Message>({ show: false, info: '' });
  const { ref } = useWorker({ updateBook, setMessage })
  useAppFocus({ current: ref, bookData })

  const toggleProduct = () => {
    if (bookData.product_id === BTC_MESSAGE.product) {
      ref?.postMessage(ETH_MESSAGE);
    } else {
      ref?.postMessage({
        ...BTC_MESSAGE,
        type: SWAP
      });
    }
  }

  return (
    <div className="text-white w-full h-full min-h-screen flex justify-center items-center">
      <Head>
        <title>{bookData.product_id} Order book</title>
        <meta name="description" content="Order book" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-full max-w-5xl mx-auto'>
        <div className='p-2 w-full text-center hidden md:block'>
          <span>Product: {bookData.product_id}</span>
        </div>
        <Book {...bookData} onClick={toggleProduct} />
        <Warning {...message} />
      </main>
    </div>
  )
}

export default Home
