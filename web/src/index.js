import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Driver from './Driver';
import './styles/index.css';

ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/plate/:licensePlate" component={Driver}/>
    </Router>),
  document.getElementById('root')
);
