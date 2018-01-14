// @flow
import * as React from 'react';
import classnames from 'classnames';

import { DEFAULT_AVATR } from '../../constants';

import './Avatar.scss';

type AvatarProps = {
  src: string,
  size: ?'smaller',
  className: ?string,
};

const Avatar = (props: AvatarProps) => {
  const classNames = classnames('Avatar', props.size && `Avatar--${props.size}`, props.className);
  const src = props.src || DEFAULT_AVATR;

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={classNames}
    />
  );
};

Avatar.defaultProps = {
  size: null,
  className: null,
};

export default Avatar;
