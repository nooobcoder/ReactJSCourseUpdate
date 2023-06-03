import './App.css';

import { Layout, Space, Typography } from 'antd';
import React, { FC } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Cryptocurrencies, Cryptodetails, Exchanges, Homepage, Navbar, News } from './components';

const App: FC = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies simplified />
              </Route>
              <Route exact path="/crypto/:coinId">
                <Cryptodetails />
              </Route>
              <Route exact path="/news">
                <News simplified />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Copyright © 2021
            <Link to="/">Cryptoverse Inc.</Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
