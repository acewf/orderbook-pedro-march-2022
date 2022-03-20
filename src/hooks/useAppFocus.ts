import { useEffect } from 'react';

import type { OrderBook } from '../types';
import {
  SWAP, PAUSE,
  BTC_MESSAGE, ETH_MESSAGE
} from '../constants';

type Props = {
  current: Worker | undefined,
  bookData: OrderBook
}

const useAppFocus = ({ current, bookData }: Props) => {
  useEffect(() => {
    const pauseRender = () => {
      current?.postMessage({
        type: PAUSE
      });
    }

    const resumeRender = () => {
      if (bookData.product_id === BTC_MESSAGE.product) {
        current?.postMessage({
          ...BTC_MESSAGE,
          type: SWAP,
        });
      } else {
        current?.postMessage(ETH_MESSAGE);
      }
    }

    window.addEventListener('blur', pauseRender);
    window.addEventListener('focus', resumeRender);

    return () => {
      window.removeEventListener('blur', pauseRender);
      window.removeEventListener('focus', resumeRender);
    }
  }, [bookData.product_id, current])

}

export default useAppFocus;
