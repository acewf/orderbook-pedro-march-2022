import { FC } from 'react';

interface Props {
  spread: string;
}

const ColumnsTitles: FC<Props> = ({ spread }) => {
  return (
    <div className="w-full text-center md:hidden">
      <span>
        {spread}
      </span>
    </div>
  );
}

export default ColumnsTitles;
