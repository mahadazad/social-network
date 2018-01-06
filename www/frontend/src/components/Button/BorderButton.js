import React from 'react';
import classnames from 'classnames';

import './BorderButton.css';

const BorderButton = ({className, ...props}) => {
  return (
    <button {...props}
            className={classnames('BorderButton', className)}>{props.children}</button>
  );
};

export default BorderButton;
