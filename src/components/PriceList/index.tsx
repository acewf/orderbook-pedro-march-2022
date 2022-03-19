import { FC, CSSProperties } from 'react';
import { BooksList, BookItem } from '../../types';

const PriceList: FC<BooksList> = ({ entries, maxTotal, isAsks }) => {
  const flexColStyle = isAsks ? 'flex-col' : 'flex-col-reverse';
  const beforeColor = isAsks ? 'before:bg-green-600/50' : 'before:bg-red-600/50';
  const textColor = isAsks ? 'text-green-600' : 'text-red-600';
  const trimmedEntries = entries.slice(0, 20);
  return (
    <ul className={`text-white flex ${flexColStyle} md:flex-col`}>
      {trimmedEntries.map(({ price, size, total }: BookItem) => {
        const styles = {
          '--bar-size': `${(total / maxTotal) * 100}%`
        } as CSSProperties
        return (
          <li
            key={price}
            style={styles}
            className={`flex flex-row justify-around text-right relative before:block before:absolute before:-inset-0 ${beforeColor} before:w-[var(--bar-size)]`}
          >
            <span className={`w-1/3 z-10 ${textColor}`}>{price.toLocaleString('en', { useGrouping: true })}</span>
            <span className="w-1/3 z-10">{size.toLocaleString('en', { useGrouping: true })}</span>
            <span className="w-1/3 z-10 mr-4">{total.toLocaleString('en', { useGrouping: true })}</span>
          </li>
        )
      })}
    </ul>
  );
}

export default PriceList;
