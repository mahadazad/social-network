// @flow
import * as React from 'react';
import classnames from 'classnames';

import './Sidebar.css';

type SidebarProps = {
  position: 'left' | 'right',
  children: React.Node,
};

const Sidebar = (props: SidebarProps) => (
  <div
    className={classnames({
      'Sidebar--left': props.position === 'left',
      'Sidebar--right': props.position === 'right',
    })}
  >
    {props.children}
  </div>
);

export default Sidebar;
