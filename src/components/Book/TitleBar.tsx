import { FC } from 'react';

interface Props {
  productId: string;
  spread: string;
}

const ColumnsTitles: FC<Props> = ({ productId, spread }) => {
  return (
    <div className='border-b border-gray-600 flex flex-row justify-between py-1 px-2'>
      <span>Order Book</span>
      <span className="hidden md:block">
        {spread}
      </span>
      <span role="selected-product" className="md:invisible">{productId}</span>
    </div>
  );
}

export default ColumnsTitles;
