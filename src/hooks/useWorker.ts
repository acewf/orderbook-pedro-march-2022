import { useRef, useEffect } from 'react';

import type { OrderBook, Message } from '../types';
import {
  CLOSED_CONNECTION, ERROR_CONNECTION,
  SUBSCRIBED_EVENT, INFO_EVENT,
  BTC_MESSAGE
} from '../constants';

type Props = {
  updateBook: (props: OrderBook) => void | undefined,
  setMessage: (props: Message) => void | undefined,
}

const useWorker = ({ updateBook, setMessage }: Props) => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    const onMessage = ({ data }: MessageEvent) => {
      switch (data.event) {
        case CLOSED_CONNECTION:
          setMessage({ show: true, info: 'Connection Paused or Closed' })

          break;
        case ERROR_CONNECTION:
          setMessage({ show: true, info: 'Connection Error' })

          break;
        case SUBSCRIBED_EVENT:

          break;
        case INFO_EVENT:
          setMessage({ show: true, info: 'Connection Established' })
          break;

        default:
          setMessage({ show: false });
          const newBook: OrderBook = data;
          updateBook(newBook)
          break;
      }
    }

    workerRef.current = new Worker(new URL('../workers/worker.ts', import.meta.url));
    workerRef.current.addEventListener('message', onMessage);
    workerRef.current.postMessage(BTC_MESSAGE);
    return () => {
      if (workerRef.current) {
        workerRef.current.removeEventListener('message', onMessage);
        workerRef.current.terminate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ref: workerRef.current
  }
}

export default useWorker;
