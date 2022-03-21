import MatchMediaMock from 'jest-matchmedia-mock';
import WorkerMock from '../pages/__mock__/worker-mock';
import { render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import { OrderBook } from '@/types';
import { mockAsks, mockBids } from '../__mock__/data';

import {
  CLOSED_CONNECTION, ERROR_CONNECTION,
} from '../constants';

let matchMedia: MatchMediaMock;
let workerRef: WorkerMock = new WorkerMock({ empty: '' });;

describe('Home', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  it('Should have warning on closed connection', async () => {
    workerRef.onPostMessage = () => {
      const data = { event: CLOSED_CONNECTION };

      const callback = workerRef.getListeners('message')[0];
      callback(new MessageEvent('message', { data }))
    }


    render(<Home />);

    const warning = await waitFor(() => screen.getByText('Connection Paused or Closed'));
    expect(warning).toBeTruthy();
  })

  it('Should have warning on connection error', async () => {
    workerRef.onPostMessage = () => {
      const data = { event: ERROR_CONNECTION };

      const callback = workerRef.getListeners('message')[0];
      callback(new MessageEvent('message', { data }))
    }


    render(<Home />);

    const warning = await waitFor(() => screen.getByText('Connection Error'));
    expect(warning).toBeTruthy();
  })

  it('Should Render Order Book', async () => {
    const data: OrderBook = {
      asks: mockAsks,
      bids: mockBids,
      product_id: 'PI_XBTUSD',
      levels: mockAsks.length
    }

    workerRef.onPostMessage = () => {
      const callback = workerRef.getListeners('message')[0];
      callback(new MessageEvent('message', { data }))
    }


    const { container } = render(<Home />);

    const allAks = container.querySelectorAll('#asks ul li');
    const allBids = container.querySelectorAll('#bids ul li');

    const asksSize = Math.min(mockAsks.length, 12);
    const bidsSize = Math.min(mockBids.length, 12);

    expect(allAks.length).toEqual(asksSize);
    expect(allBids.length).toEqual(bidsSize);
  })
})
