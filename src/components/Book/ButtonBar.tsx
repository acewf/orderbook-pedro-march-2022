import { FC, MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler;
}

const ColumnsTitles: FC<Props> = ({ onClick }) => {
  return (
    <div className='text-center'>
      <button className='rounded bg-purple-800 text-white p-2 m-2' onClick={onClick}>
        Toggle Product
      </button>
    </div>
  );
}

export default ColumnsTitles;
