// @flow
import * as React from 'react';

import './PostAction.css';

type PostActionProps = {
  icon: string,
};

const PostAction = ({ icon, ...props }: PostActionProps) => (
  <a {...props} className="PostAction__link">
    <span className={`PostAction__icon fa fa-${icon}`} />
  </a>
);

export default PostAction;
