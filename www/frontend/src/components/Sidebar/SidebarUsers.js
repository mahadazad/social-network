// @flow
import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';

import Panel from '../Panel/Panel';
import Avatar from '../Avatar/Avatar';
import Tooltip from '../Tooltip/Tooltip';

import './SidebarUsers.scss';

type SidebarUsersProps = {
  title: string,
  users: Array<Object>,
  history: RouterHistory,
};

const SidebarUsers = (props: SidebarUsersProps) => (
  <div className="SidebarUsers">
    <Panel className="SidebarUsers__list" title={props.title} padded>
      {props.users.map(user => (
        <Tooltip key={user.id} title={`${user.firstName} ${user.lastName}`}>
          <a
            className="SidebarUsers__user"
            onClick={() => {
              props.history.push(`/profile/${user.id}`);
            }}
          >
            <Avatar src={user.avatar} />
          </a>
        </Tooltip>
      ))}
    </Panel>
  </div>
);

export default withRouter(SidebarUsers);
