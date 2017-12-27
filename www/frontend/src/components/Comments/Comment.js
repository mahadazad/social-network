import React from 'react';

import './Comment.css';

import Avatar from '../Avatar/Avatar';

const Comment = () => {
  return (
    <div className="Comment">
      <Avatar className="Comment__avatar" size="smaller"/>

      <div className="Comment__right">
        <strong className="Comment__user">Tommy</strong>
        &nbsp;
        adsfasfs
      </div>
    </div>
  );
};

export default Comment;
