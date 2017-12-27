import React from 'react';

import './Comments.css';

import Comment from './Comment';

const Comments = () => {
  return (
    <div className="Comments">
      <Comment/>
      <Comment/>
    </div>
  );
};

export default Comments;
