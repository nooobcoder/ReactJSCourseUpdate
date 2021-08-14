import React from 'react';
import { Props } from '../pages';
import Product from './Product';

const ProductFeed = ({ products }: Props) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 md:-mt-52">
      {products.slice(0, 4).map(product => (
        <Product key={product.id} {...product} />
      ))}

      <img
        className="md:col-span-4"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/SBP/2018/gateway/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630_.jpg"
        alt="advert"
      />

      <div className="md:col-span-2 line-clamp-3">
        {products.slice(4, 5).map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      {products.slice(5, products.length).map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductFeed;
