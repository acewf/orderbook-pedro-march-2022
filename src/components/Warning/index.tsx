import { FC } from 'react';
import type { IMessage } from '../../types';

const Warning: FC<IMessage> = ({ info, show, onClick }) => {
  if (!show) return null;

  return (
    <div role="warning" className="absolute inset-0 flex flex-col justify-center items-center bg-black/50">
      <p>{info}</p>
      <button className='rounded bg-purple-800 text-white p-2 m-2' onClick={onClick}>
        Return to order book
      </button>
    </div>
  );
}

export default Warning;
