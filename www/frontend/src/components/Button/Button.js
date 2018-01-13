// @flow
import * as React from 'react';
import classnames from 'classnames';

import './Button.css';

type ButtonProps = {
  className: string,
};

const Button = ({ className, ...props }: ButtonProps) => (
  <button {...props} className={classnames('Button', className)}>
    {props.children}
  </button>
);

export default Button;
