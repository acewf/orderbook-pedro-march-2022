import { BookItem } from '@/types';

const bookLevels = 25;
const initialPrice = 40000;

const asks: Array<BookItem> = [{
  price: initialPrice,
  size: 100,
  total: 100
}]

export const bids: Array<BookItem> = [{
  price: initialPrice,
  size: 10,
  total: 10
}]


for (let index = 0; index < bookLevels; index++) {
  const priceAsks = asks?.[asks.length - 1].price || initialPrice
  const diff = (index + 1) * Math.round(Math.random() * 10) + 1;
  const quant = (index + 1) * Math.round(Math.random() * 5) + 1;
  const total = asks[asks.length - 1].total + quant;

  asks.push({
    price: priceAsks + diff,
    size: quant,
    total
  })

  const priceBids = bids?.[bids.length - 1].price || initialPrice

  bids.push({
    price: priceBids + (-1 * diff),
    size: quant,
    total
  })
}

export const mockAsks: Array<BookItem> = asks;
export const mockBids: Array<BookItem> = bids;
