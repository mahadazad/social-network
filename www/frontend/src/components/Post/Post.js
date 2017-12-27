import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';

import PostImage from './PostImage';
import PostHeader from './PostHeader';
import Comments from '../Comments/Comments';
import MessageArea from '../MessageArea/MessageArea';

class Post extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollActions);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollActions);
  }

  render() {
    return (
      <div className="Post"
           ref={el => (this.postEl = el)}>
        <PostHeader/>
        <div className="Post__inner Post__inner--has-comments">
          <div className="Post__content">
            <PostImage/>
          </div>
          <div className="Post__actions"
               ref={el => (this.actionsEl = el)}>
            <a className="Post__action">
              <span className="Post__action-icon fa fa-comment-o"/>
            </a>

            <a className="Post__action">
              <span className="Post__action-icon fa fa-thumbs-o-up"/>
            </a>
          </div>
        </div>
        <Comments/>
        <MessageArea/>
      </div>
    )
  }

  scrollActions = () => {
    const windowScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const postTop = this.postEl.offsetTop;
    const postHeight = this.postEl.offsetHeight;
    const postBottomY = postTop + postHeight - 160;
    const minY = 32;
    const maxY = postHeight - this.actionsEl.offsetHeight - 60;

    if (windowScrollY > postTop && windowScrollY < postBottomY) {
      this.actionsEl.style.top = `${windowScrollY - postTop}px`;
    } else if (windowScrollY > postBottomY) {
      this.actionsEl.style.top = `${maxY}px`;
    } else {
      this.actionsEl.style.top = `${minY}px`;
    }
  };
}

Post.defaultProps = {
  content: '',
  data: {},
  likesCount: 0,
  commentsCount: 0,
  meta: {},
};

Post.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['status', 'image', 'video', 'vote']),
    userId: PropTypes.string,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    date: PropTypes.date,
    meta: PropTypes.object,
  }),
};

export default Post;
