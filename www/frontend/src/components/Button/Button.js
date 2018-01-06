import React from 'react';

import './Button.css';
import classnames from 'classnames';

const Button = ({className, ...props}) => {
  return (
    <button {...props}
            className={classnames('Button', className)}>{props.children}</button>
  );
};

export default Button;
