import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from "react-router";

import Header from './pages/header/Header';
import Home from './pages/home/Home';
import Mission from './pages/mission/Mission';
import OfferRoom from './pages/offerRoom/OfferRoom';
import People from './pages/people/People';
import Rooms from './pages/rooms/Rooms';
import SeekRoom from './pages/seekRoom/SeekRoom';
import Team from './pages/team/Team';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Header />
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/mission" component={Mission} />
        <Route path="/offerRoom" component={OfferRoom} />
        <Route path="/people" component={People} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/seekRoom" component={SeekRoom} />
        <Route path="/team" component={Team} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
