// @flow
import * as React from 'react';

import images from './images.json';
import './MemeMakerImages.scss';

type MemeMakerImagesProps = {
  onImageClick: Function, // eslint-disable-line react/no-unused-prop-types
  onClose?: ?Function,
};

const MemeMakerImages = (props: MemeMakerImagesProps) => {
  return (
    <div className="MemeMakerImages">
      <div className="MemeMakerImages__inner">
        {images.map(icon => (
          <button
            className="MemeMakerImages__image-button"
            key={icon}
            onClick={() => props.onImageClick && props.onImageClick(icon)}
          >
            <img className="MemeMakerImages__image" src={icon} />
          </button>
        ))}
      </div>
      <button className="MemeMakerImages__close" onClick={props.onClose}>
        <span className="fa fa-times-circle" />
      </button>
    </div>
  );
};

MemeMakerImages.defaultProps = {
  onClose: null,
};

export default MemeMakerImages;
