// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

import Header from '../Header/Header';
import ProfilePage from '../ProfilePage/ProfilePage';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component<{}> {
  render() {
    return [
      <Header key="header" />,
      <div key="container" className="App__container container">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/profile/:id" exact component={ProfilePage} />
          <Route path="/home" exact component={ProfilePage} />
        </Switch>
      </div>,
    ];
  }
}

export default App;
