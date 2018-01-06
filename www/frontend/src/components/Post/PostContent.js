import React from 'react';
import PropTypes from 'prop-types';

import './PostContent.css';

const PostContent = (props) => {
  switch (props.type) {
    case 'image':
      return renderImage(props);
    case 'video':
      return renderVideo(props);
    default:
      return props.content;
  }
};

const renderImage = (props) => {
  return (
    <img className="PostContent__image"
         alt={props.content}
         src={props.content}/>
  );
};

const renderVideo = (props) => {
  return (
    <video className="PostContent__video"
           src={props.content}
           controls/>
  );
};

PostContent.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string,
};

export default PostContent;
