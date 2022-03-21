import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts'

import type { IBook } from '../../types';
import TitleBar from './TitleBar';
import ButtonBar from './ButtonBar';
import ColumnsTitles from './ColumnsTitles';
import MobileSpreadBar from './MobileSpreadBar';
import PriceList from '../PriceList';
import { getBookInfo } from './dataHelper';


const Book: FC<IBook> = ({ asks, bids, product_id, onClick }) => {
  const matches: boolean = useMediaQuery('(min-width: 768px)')

  const { spread, maxTotal, shortAsks, shortBids } = getBookInfo({ matches, asks, bids });

  return (
    <div className="bg-blueish border border-gray-600 text-gray-600">
      <TitleBar spread={spread} productId={product_id} />
      <div className="w-full min-h-[300px]">
        <div className="flex flex-col md:flex-row-reverse">
          <div className="h-auto md:h-full w-full overflow-hidden">
            <ColumnsTitles />
            <PriceList maxTotal={maxTotal} entries={shortAsks} isAsks={true} />
          </div>
          <MobileSpreadBar spread={spread} />
          <div className="h-auto md:h-fullnp w-full overflow-hidden">
            <div className="hidden md:flex">
              <ColumnsTitles />
            </div>
            <PriceList maxTotal={maxTotal} entries={shortBids} isAsks={false} />
          </div>
        </div>
      </div>
      <ButtonBar onClick={onClick} />
    </div >
  );
}

export default Book
