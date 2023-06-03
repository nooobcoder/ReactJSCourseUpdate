import { Spin } from 'antd';
import { FC } from 'react';

const Loader: FC = () => (
  <div className="loader">
    <Spin />
  </div>
);

export default Loader;
