import React from 'react';

import './SidebarAbout.css';

import Panel from '../Panel/Panel';

const SidebarAbout = () => {
  return (
    <Panel title="Profile Info" padded>
      <h4>About</h4>
      <div className="SidebarAbout__section">
        Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56.
      </div>
    </Panel>
  );
};

export default SidebarAbout;
