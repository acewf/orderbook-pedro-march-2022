import { FC, CSSProperties, useMemo } from 'react';
import type { BooksList, BookItem } from '../../types';

const getBeforeStyles = (isAsks: boolean) => {
  return isAsks ? {
    color: 'before:bg-red-600/50',
    mdPositon: 'md:before:rigth-auto'
  } : {
    color: 'before:bg-green-600/50',
    mdPosition: 'md:before:left-auto'
  };
}

const getTextColor = (isAsks: boolean) => {
  return isAsks ? 'text-red-600' : 'text-green-600';
}

const List: FC<BooksList> = ({ entries, maxTotal, isAsks }) => {
  const before = useMemo(() => getBeforeStyles(isAsks), [isAsks]);
  const textColor = useMemo(() => getTextColor(isAsks), [isAsks]);


  return (
    <>
      {entries.map(({ price, size, total }: BookItem) => {
        const styles = {
          '--bar-size': `${(total / maxTotal) * 100}%`
        } as CSSProperties;

        return (
          <li
            key={price}
            style={styles}
            className={`flex flex-row flex-1 justify-around text-right relative before:block before:absolute before:-inset-0 ${before.color} before:w-[var(--bar-size)] ${before.mdPosition}`}
          >
            <span className={`w-1/3 whitespace-pre-wrap ${textColor}`}>{price.toLocaleString('en', { useGrouping: true })}</span>
            <span className="w-1/3 whitespace-pre-wrap">{size.toLocaleString('en', { useGrouping: true })}</span>
            <span className="w-1/3 whitespace-pre-wrap mr-4">{total.toLocaleString('en', { useGrouping: true })}</span>
          </li>
        )
      })}
    </>
  )
}

export default List;
