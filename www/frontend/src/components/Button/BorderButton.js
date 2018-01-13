// @flow
import * as React from 'react';
import classnames from 'classnames';

import './BorderButton.css';

type BorderButtonProps = {
  className: string,
};

const BorderButton = ({ className, ...props }: BorderButtonProps) => (
  <button {...props} className={classnames('BorderButton', className)}>
    {props.children}
  </button>
);

export default BorderButton;
