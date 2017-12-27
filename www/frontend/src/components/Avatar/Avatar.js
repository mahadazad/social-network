import React from 'react';
import classnames from 'classnames';

import './Avatar.css';

const Avatar = (props) => {
  const classNames = classnames(
    'Avatar',
    props.size && `Avatar--${props.size}`,
    props.className,
  );

  return (
    <div className={classNames} />
  );
};

export default Avatar;
