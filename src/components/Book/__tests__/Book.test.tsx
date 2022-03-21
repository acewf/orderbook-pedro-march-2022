import MatchMediaMock from 'jest-matchmedia-mock';

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Book from '../index';
import { mockAsks, mockBids } from '../../../__mock__/data';
import { IBook } from '@/types';

let matchMedia;


describe('Order', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  it('Should render empty Book', async () => {
    const props: IBook = {
      onClick: (x) => x,
      asks: [],
      bids: [],
      product_id: '',
      levels: 0
    }
    const { container } = render(<Book {...props} />);

    const allItems = container.querySelectorAll('ul li');

    expect(allItems.length).toEqual(0);
  });

  it('Should render book with 12 max levels', async () => {
    const props: IBook = {
      onClick: (x) => x,
      asks: mockAsks,
      bids: mockBids,
      product_id: 'PI_XBTUSD',
      levels: mockAsks.length
    }

    const { container } = render(<Book {...props} />);

    const allAks = container.querySelectorAll('#asks ul li');
    const allBids = container.querySelectorAll('#bids ul li');

    const asksSize = Math.min(mockAsks.length, 12);
    const bidsSize = Math.min(mockBids.length, 12);

    expect(allAks.length).toEqual(asksSize);
    expect(allBids.length).toEqual(bidsSize);
  });

  it('Should match product id', async () => {
    const props: IBook = {
      onClick: (x) => x,
      asks: mockAsks,
      bids: mockBids,
      product_id: 'PI_XBTUSD',
      levels: mockAsks.length
    }

    render(<Book {...props} />);

    const out = await waitFor(() => screen.getByRole('selected-product'));
    expect(out).toHaveTextContent('PI_XBTUSD');
  });

  it('Should swap product id', async () => {
    const props: IBook = {
      onClick: () => {
        rerender(<Book {...props} product_id={'PI_ETHUSD'} />);
      },
      asks: mockAsks,
      bids: mockBids,
      product_id: 'PI_XBTUSD',
      levels: mockAsks.length
    }

    const { container, rerender } = render(<Book {...props} />);

    const out = await waitFor(() => screen.getByRole('selected-product'));
    expect(out).toHaveTextContent('PI_XBTUSD');

    const toggleButton = container.querySelector('button');
    await fireEvent.click(toggleButton as Element);

    expect(out).toHaveTextContent('PI_ETHUSD');
  });
});
