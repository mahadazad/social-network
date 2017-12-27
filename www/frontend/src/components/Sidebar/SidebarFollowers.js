import React from 'react';

import './SidebarFollowers.css';

import Panel from '../Panel/Panel';
import Avatar from '../Avatar/Avatar';

const SidebarFollowers = () => {
  return (
    <div className="SidebarFollowers">
      <Panel className="SidebarFollowers__list"
             title="Followers"
             padded>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
        <Avatar className="SidebarFollowers__user"/>
      </Panel>
    </div>
  );
};

export default SidebarFollowers;
