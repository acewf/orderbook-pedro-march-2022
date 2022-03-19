import { FC, CSSProperties, useMemo } from 'react';
import { BooksList, BookItem } from '../../types';

const getFlexCol = (isAsks: boolean) => {
  return isAsks ? 'flex-col-reverse' : 'flex-col';
}

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

const PriceList: FC<BooksList> = ({ entries, maxTotal, isAsks }) => {
  const flexColStyle = useMemo(() => getFlexCol(isAsks), [isAsks]);
  const before = useMemo(() => getBeforeStyles(isAsks), [isAsks]);
  const textColor = useMemo(() => getTextColor(isAsks), [isAsks]);

  let prices = '';
  let sizes = '';
  let totals = '';

  const barsList = entries.map(({ price, size, total }: BookItem) => {
    const styles = {
      '--bar-size': `${(total / maxTotal) * 100}%`
    } as CSSProperties;

    prices += `${price}\n`;
    sizes += `${size}\n`;
    totals += `${total}\n`;

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
  })



  return (
    <div className="relative h-full text-white">
      <ul className={`h-full flex ${flexColStyle} md:flex-col`}>
        {barsList}
      </ul>
    </div>
  );
}

export default PriceList;
