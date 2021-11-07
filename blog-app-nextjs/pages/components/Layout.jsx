import React from 'react';

import { Header } from './index';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
