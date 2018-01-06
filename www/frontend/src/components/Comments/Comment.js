import React from 'react';
import PropTypes from 'prop-types';

import './Comment.css';

import Avatar from '../Avatar/Avatar';

const Comment = (props) => {
  return (
    <div className="Comment">
      <Avatar className="Comment__avatar" size="smaller" src={props.user.avatar}/>

      <div className="Comment__right">
        <strong className="Comment__user">{props.user.firstName}</strong>
        &nbsp;
        {props.comment}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
};

export default Comment;
