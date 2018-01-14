// @flow
import * as React from 'react';

import Comment from './Comment';

import './Comments.scss';

type CommentsProps = {
  comments: Array<Object>,
};

const Comments = (props: CommentsProps) => (
  <div className="Comments">
    {props.comments.map(comment => (
      <Comment key={comment.id} comment={comment.comment} user={comment.user} createdAt={comment.createdAt} />
    ))}
  </div>
);

export default Comments;
