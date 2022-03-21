import { FC, useMemo } from 'react';
import type { BooksList, BookItem } from '../../types';
import List from './List'

const getFlexCol = (isAsks: boolean) => {
  return isAsks ? 'flex-col-reverse' : 'flex-col';
}

const PriceList: FC<BooksList> = ({ entries, maxTotal, isAsks }) => {
  const flexColStyle = useMemo(() => getFlexCol(isAsks), [isAsks]);
  const id = isAsks ? 'asks' : 'bids';

  return (
    <div id={id} className="relative h-full text-white">
      <ul className={`h-full flex ${flexColStyle} md:flex-col`}>
        <List entries={entries} maxTotal={maxTotal} isAsks={isAsks} />
      </ul>
    </div>
  );
}

export default PriceList;
