import { FC } from 'react';
import type { Message } from '../../types';

const Warning: FC<Message> = ({ info, show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/50">{info}</div>
  );
}

export default Warning;
