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
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <Cryptodetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
      </div>
      <div className="footer"></div>
      Cryptoverse
    </div>
  );
};

export default App;
