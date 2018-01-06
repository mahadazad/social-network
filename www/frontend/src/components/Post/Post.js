import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';

import PostHeader from './PostHeader';
import Comments from '../Comments/Comments';
import MessageArea from '../MessageArea/MessageArea';
import PostContent from './PostContent';

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
        <PostHeader userName={this.props.user.firstName}
                    avatar={this.props.user.avatar}
                    createdAt={this.props.createdAt}
        />
        <div className="Post__inner Post__inner--has-comments">
          <div className="Post__content">
            <PostContent content={this.props.content}
                         type={this.props.type}/>
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
        <Comments comments={this.props.comments}/>
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
  comments: [],
  user: {},
  likesCount: 0,
  commentsCount: 0,
};

Post.propTypes = {
  content: PropTypes.string,
  type: PropTypes.oneOf(['status', 'image', 'video', 'vote']),
  user: PropTypes.object,
  comments: PropTypes.array,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  createdAt: PropTypes.string,
};

export default Post;
