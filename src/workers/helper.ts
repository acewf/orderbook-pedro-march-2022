import { BookItem } from '../types';

function sortAndAddTotals(entries: Array<BookItem>, asc: boolean): Array<BookItem> {
  const sortEntries = entries.sort((a, b) => {
    if (asc) {
      return Math.round(a.price - b.price)
    }
    return Math.round(b.price - a.price)
  });

  let totalSize = 0;
  return sortEntries.map(({ size, price }) => {
    totalSize += size;
    const entry: BookItem = {
      price,
      size,
      total: totalSize
    }
    return entry;
  });
}

export function bookConverter(data: number[][], asc: boolean): Array<BookItem> {
  const entries = data.map(([price, size]) => {
    const entry: BookItem = {
      price,
      size,
      total: 0
    }
    return entry;
  });

  return sortAndAddTotals(entries, asc);
}

export function bookUpdater(entries: Array<BookItem>, data: number[][], asc: boolean): Array<BookItem> {
  const newEntries = [...entries];
  data.forEach(([price, newSize]) => {
    const entryIndex = newEntries.findIndex((entry) => (entry.price === price));
    if (Boolean(~entryIndex)) {
      newEntries[entryIndex].size = newSize;
    } else {
      const entry: BookItem = {
        price,
        size: newSize,
        total: 0
      }
      newEntries.push(entry)
    }
  })

  const filteredEntries = newEntries.filter(({ size }) => size > 0);
  return sortAndAddTotals(filteredEntries, asc);
}
