// @flow
import * as React from 'react';

import './PostContent.css';

const renderImage = props => <img className="PostContent__image" alt={props.content} src={props.content} />;

const renderVideo = props => <video className="PostContent__video" src={props.content} controls />;

type PostContentProps = {
  type: string,
  content: string,
};

const PostContent = (props: PostContentProps) => {
  switch (props.type) {
    case 'image':
      return renderImage(props);
    case 'video':
      return renderVideo(props);
    default:
      return props.content;
  }
};

export default PostContent;
