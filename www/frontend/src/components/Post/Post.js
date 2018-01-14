// @flow
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PostHeader from './PostHeader';
import Comments from '../Comments/Comments';
import PostContent from './PostContent';
import CommentArea from '../../containers/CommentArea/CommentArea';
import PostAction from './PostAction';
import PostLikeAction from '../../containers/PostLikeAction/PostLikeAction';
import { scrollToElement } from '../../utils';

import './Post.scss';

type PostProps = {
  postId: string,
  content: string,
  type: 'status' | 'image' | 'video' | 'vote',
  user: Object,
  comments: Array<Object>,
  hasLiked: boolean,
  likesCount: number,
  commentsCount: number,
  createdAt: string,
  updateComments: Function,
  onLike: Function,
};

class Post extends React.PureComponent<PostProps> {
  static defaultProps = {
    comments: [],
    likesCount: 0,
    commentsCount: 0,
    hasLiked: false,
    updateComments: null,
    onLike: null,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollActions);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollActions);
  }

  onEditorCreate = (editor: any) => {
    this.editor = editor;
  };

  onCommentIconClick = () => {
    if (!this.commentEditorWrapEl) {
      return;
    }
    scrollToElement(this.commentEditorWrapEl).then(() => this.editor.focus());
  };

  scrollActions = () => {
    if (!this.postEl || !this.actionsEl) {
      return;
    }

    const windowScrollY = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;
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

  editor: any;
  actionsEl: ?HTMLDivElement;
  postEl: ?HTMLDivElement;
  commentEditorWrapEl: ?HTMLElement;

  render() {
    return (
      <div
        className="Post"
        ref={el => {
          this.postEl = el;
        }}
      >
        <PostHeader
          userName={this.props.user.firstName}
          avatar={this.props.user.avatar}
          createdAt={this.props.createdAt}
        />
        <div className="Post__inner Post__inner--has-comments">
          <div className="Post__content">
            <PostContent content={this.props.content} type={this.props.type} />
          </div>
          <div
            className="Post__actions"
            ref={el => {
              this.actionsEl = el;
            }}
          >
            <PostAction icon="comment-o" onClick={this.onCommentIconClick} />
            <TransitionGroup>
              {!this.props.hasLiked && (
                <CSSTransition timeout={200} classNames="Post__liked">
                  <PostLikeAction postId={this.props.postId} onLike={this.props.onLike} />
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>
        </div>
        <div className="Post__likes-wrap">
          <span className="fa fa-thumbs-up" />
          <span className="Post__likes">{this.props.likesCount}</span>
        </div>
        <Comments comments={this.props.comments} />
        <div
          ref={el => {
            this.commentEditorWrapEl = el;
          }}
        >
          <CommentArea
            postId={this.props.postId}
            update={this.props.updateComments}
            onEditorCreate={this.onEditorCreate}
          />
        </div>
      </div>
    );
  }
}

export default Post;
