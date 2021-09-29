import React from 'react';
import styled from 'styled-components';
import './App.css';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => <AppContainer className="App">Hello World</AppContainer>;

export default App;