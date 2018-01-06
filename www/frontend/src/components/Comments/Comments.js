import React from 'react';

import './Comments.css';

import Comment from './Comment';

const Comments = (props) => {
  return (
    <div className="Comments">
      {props.comments.map(
        comment => (
          <Comment
            key={comment.id}
            comment={comment.comment}
            user={comment.user}
            createdAt={comment.createdAt}/>
        )
      )}
    </div>
  );
};

export default Comments;
