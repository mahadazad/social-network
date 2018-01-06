import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './SidebarUsers.css';

import Panel from '../Panel/Panel';
import Avatar from '../Avatar/Avatar';
import Tooltip from '../Tooltip/Tooltip';

const SidebarUsers = (props) => {
  return (
    <div className="SidebarUsers">
      <Panel className="SidebarUsers__list"
             title={props.title}
             padded>
        {props.users.map(user =>
          <Tooltip key={user.id}
                   title={`${user.firstName} ${user.lastName}`}>
            <a className="SidebarUsers__user"
               onClick={() => {
                 props.history.push(`/profile/${user.id}`);
               }}>
              <Avatar src={user.avatar}/>
            </a>
          </Tooltip>
        )}
      </Panel>
    </div>
  );
};

SidebarUsers.propTypes = {
  title: PropTypes.string,
  users: PropTypes.array,
};

export default withRouter(SidebarUsers);
