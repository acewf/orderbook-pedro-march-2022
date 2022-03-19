import { FC, CSSProperties } from 'react';
import { OrderBook, BookItem } from '../../types';
import PriceList from '../PriceList';

const Book: FC<OrderBook> = ({ asks, bids, maxTotal }) => {

  return (
    <div className="bg-blueish border border-gray-600 text-gray-600">
      <div className='border-b border-gray-600 flex flex-row justify-between py-1 px-2'>
        <span>Order Book</span>
        <span className="invisible md:visible">Spread</span>
        <span></span>
      </div>
      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex flex-row justify-around border-b border-gray-700 text-right">
            <span className="w-1/3">Price</span>
            <span className="w-1/3">Size</span>
            <span className="w-1/3 mr-4">Total</span>
          </div>
          <div className="h-[400px] overflow-hidden">
            <PriceList maxTotal={maxTotal} entries={bids} isAsks={false} />
          </div>
          <div className="w-full">
            <span className="visbile md:invisible">Spread</span>
          </div>
          <div className="h-[400px] overflow-hidden">
            <PriceList maxTotal={maxTotal} entries={asks} isAsks={true} />
          </div>
        </div>
      </div>
      <div className='toogle-wrapper'>
        {maxTotal}
      </div>
    </div >
  );
}

export default Book
