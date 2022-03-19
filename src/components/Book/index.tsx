import { FC, MouseEventHandler } from 'react';
import { OrderBook, BookItem } from '../../types';
import PriceList from '../PriceList';

interface BookProps extends OrderBook {
  onClick: MouseEventHandler;
}

const Book: FC<BookProps> = ({ asks, bids, onClick }) => {
  const lastAsk: BookItem = asks[asks.length - 1];
  const lastBid: BookItem = bids[bids.length - 1];
  const maxTotal: number = Math.max(lastAsk?.total || 0, lastBid?.total || 0);

  const firstAskPrice: number = asks?.[0]?.price || 0;
  const firstBidPrice: number = bids?.[0]?.price || 0;
  const spread: number = firstAskPrice - firstBidPrice;
  const averagePrice: number = (firstAskPrice + firstBidPrice) / 2;
  const spreadPercentual: number = (spread / averagePrice) * 100;

  const spreadCopy: string = `Spread: ${spread.toLocaleString('en', { useGrouping: true })} (${spreadPercentual.toFixed(2)}%)`

  return (
    <div className="bg-blueish border border-gray-600 text-gray-600">
      <div className='border-b border-gray-600 flex flex-row justify-between py-1 px-2'>
        <span>Order Book</span>
        <span className="invisible md:visible">
          {spreadCopy}
        </span>
        <span className="invisible">Order Book</span>
      </div>
      <div className="w-full">
        <div className="flex flex-col md:flex-row-reverse">

          <div className="h-[400px] w-full overflow-hidden">
            <div className="flex flex-row justify-around border-b border-gray-700 text-right">
              <span className="w-1/3">Price</span>
              <span className="w-1/3">Size</span>
              <span className="w-1/3 mr-4">Total</span>
            </div>
            <PriceList maxTotal={maxTotal} entries={asks} isAsks={true} />
          </div>
          <div className="w-full text-center md:hidden">
            <span className="">
              {spreadCopy}
            </span>
          </div>
          <div className="h-[400px] w-full overflow-hidden">
            <div className="flex-row justify-around border-b border-gray-700 text-right hidden md:flex">
              <span className="w-1/3">Price</span>
              <span className="w-1/3">Size</span>
              <span className="w-1/3 mr-4">Total</span>
            </div>
            <PriceList maxTotal={maxTotal} entries={bids} isAsks={false} />
          </div>
        </div>
      </div>
      <div className='text-center'>
        <button className='rounded bg-purple-800 text-white p-2 m-2' onClick={onClick}>
          Toggle Product
        </button>
      </div>
    </div >
  );
}

export default Book
