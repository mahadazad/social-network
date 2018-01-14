// @flow
import * as React from 'react';
import classnames from 'classnames';

import './Button.scss';

type ButtonProps = {
  className?: string,
  children: React.Node,
};

const Button = ({ className, ...props }: ButtonProps) => (
  <button {...props} className={classnames('Button', className)}>
    {props.children}
  </button>
);

export default Button;
