// @flow
import * as React from 'react';

import Avatar from '../Avatar/Avatar';

import './Comment.css';

type CommentProps = {
  comment: string,
  user: Object,
  createdAt: string,
};

const Comment = (props: CommentProps) => (
  <div className="Comment">
    <Avatar className="Comment__avatar" size="smaller" src={props.user.avatar} />

    <div className="Comment__right">
      <strong className="Comment__user">{props.user.firstName}</strong>
      &nbsp;
      {props.comment}
    </div>
  </div>
);

export default Comment;
