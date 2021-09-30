import React from 'react';
import styled from 'styled-components';
import './App.css';
import HomePage from './containers/HomePage';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => (
  <AppContainer className="App">
    Hello World
    <HomePage />
  </AppContainer>
);

export default App;
