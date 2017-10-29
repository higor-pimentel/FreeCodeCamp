/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
