import React, { Component } from 'react';

import './App.css';

import Header from '../Header/Header';
import StatusArea from '../../components/StatusArea/StatusArea';
import Post from '../../components/Post/Post';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarAbout from '../../components/Sidebar/SidebarAbout';
import SidebarFollowers from '../../components/Sidebar/SidebarFollowers';

class App extends Component {
  render() {
    return [
      <Header key="header"/>,
      <div key="container" className="App__container container">
        <Sidebar>
          <SidebarAbout/>
        </Sidebar>
        <div>
          <ProfileHeader/>

          <StatusArea/>

          <Post data={{
            content: '',
            type: 'image',
          }}/>
        </div>
        <Sidebar position="right">
          <SidebarFollowers/>
        </Sidebar>
      </div>
    ];
  }
}

export default App;
