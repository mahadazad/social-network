import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Avatar.css';

import { DEFAULT_AVATR } from '../../constants';

const Avatar = (props) => {
  const classNames = classnames(
    'Avatar',
    props.size && `Avatar--${props.size}`,
    props.className,
  );

  const src = props.src || DEFAULT_AVATR;

  return (
    <div style={{
      backgroundImage: `url(${src})`
    }}
      className={classNames}/>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
};

export default Avatar;
