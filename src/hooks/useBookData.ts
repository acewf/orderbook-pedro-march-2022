import { useRef, useEffect, useState } from 'react';
import throttle from 'just-throttle';
import { useFps } from "react-fps";

import type { OrderBook } from '../types';
import {
  EMPTY_BOOK,
} from '../constants';

const useBookData = () => {
  const { currentFps } = useFps(20);
  const throttleValue: number = currentFps > 40 ? 20 : 100;
  const [bookData, setBookData] = useState<OrderBook>(EMPTY_BOOK);
  const throttleRef = useRef(throttle((bookValue: OrderBook) => setBookData(bookValue), 20));

  useEffect(() => {
    throttleRef.current = throttle((bookValue: OrderBook) => setBookData(bookValue), throttleValue);
  }, [throttleValue])


  return {
    bookData,
    updateBook: throttleRef.current
  }

}

export default useBookData;
