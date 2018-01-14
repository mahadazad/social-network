// @flow
import * as React from 'react';
import classnames from 'classnames';

import './BorderButton.scss';

type BorderButtonProps = {
  className: string,
  children: React.Node,
};

const BorderButton = ({ className, ...props }: BorderButtonProps) => (
  <button {...props} className={classnames('BorderButton', className)}>
    {props.children}
  </button>
);

export default BorderButton;
