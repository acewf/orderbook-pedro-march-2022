import { FC } from 'react';

const ColumnsTitles: FC = () => {
  return (
    <div className="flex-row w-full justify-around border-b border-gray-700 text-right hidden md:flex">
      <span className="w-1/3">Price</span>
      <span className="w-1/3">Size</span>
      <span className="w-1/3 mr-4">Total</span>
    </div>
  );
}

export default ColumnsTitles;
