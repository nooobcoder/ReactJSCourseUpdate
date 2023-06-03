import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Alert } from 'shards-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import Chat from './Chat';

const App = () => (
  <div>
    <Chat />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
