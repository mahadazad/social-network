// @flow
import * as React from 'react';

import Panel from '../Panel/Panel';

import './SidebarAbout.scss';

const SidebarAbout = () => (
  <Panel title="Profile Info" padded>
    <h4>About</h4>
    <div className="SidebarAbout__section">
      Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56.
    </div>
  </Panel>
);

export default SidebarAbout;
