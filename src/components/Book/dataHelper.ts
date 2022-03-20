
import type { BookItem } from '../../types';

type InfoProps = {
  matches: boolean;
  asks: Array<BookItem>;
  bids: Array<BookItem>;
}

export const getBookInfo = ({ matches, asks, bids }: InfoProps) => {
  const bookLength: number = matches ? 16 : 12;
  const shortAsks: Array<BookItem> = asks.slice(0, bookLength);
  const shortBids: Array<BookItem> = bids.slice(0, bookLength);
  const lastAsk: BookItem = shortAsks[shortAsks.length - 1];
  const lastBid: BookItem = shortBids[shortBids.length - 1];
  const maxTotal: number = Math.max(lastAsk?.total || 0, lastBid?.total || 0);

  const firstAskPrice: number = shortAsks?.[0]?.price || 0;
  const firstBidPrice: number = shortBids?.[0]?.price || 0;
  const spread: number = firstAskPrice - firstBidPrice;
  const averagePrice: number = (firstAskPrice + firstBidPrice) / 2;
  const spreadPercentual: number = (spread / averagePrice) * 100;

  const spreadCopy: string = `Spread: ${spread.toLocaleString('en', { useGrouping: true })} (${spreadPercentual.toFixed(2)}%)`;

  return {
    shortAsks,
    shortBids,
    maxTotal,
    spread: spreadCopy
  }
}
