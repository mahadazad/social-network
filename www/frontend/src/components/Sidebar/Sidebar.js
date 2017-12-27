import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Sidebar.css';

const Sidebar = (props) => {
  return (
    <div className={classnames({
      'Sidebar--left': props.position === 'left',
      'Sidebar--right': props.position === 'right',
    })}>
      {props.children}
    </div>
  );
};

Sidebar.defaultProps = {
  position: 'left',
};

Sidebar.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
};

export default Sidebar;
