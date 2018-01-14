// @flow
import * as React from 'react';

import Avatar from '../Avatar/Avatar';
import PostHeaderMenu from './PostHeaderMenu';

import './PostHeader.scss';

type PostHeaderProps = {
  userName: string,
  avatar: string,
  createdAt: string,
};

type PostHeaderState = {
  isMenuVisible: boolean,
};

class PostHeader extends React.PureComponent<PostHeaderProps, PostHeaderState> {
  state = {
    isMenuVisible: false,
  };

  onMenuMount = (el: any) => {
    el.style.top = `${this.lastY}px`;
    el.style.left = `${this.lastX}px`;
  };

  onMenuBtnClick = (e: any) => {
    const winX = window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || 0;
    const winY = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;
    this.lastX = winX + e.clientX;
    this.lastY = winY + e.clientY;
    this.toggleMenu();
  };

  toggleMenu = () => {
    this.setState(state => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  lastX = 0;
  lastY = 0;

  render() {
    return (
      <div className="PostHeader">
        <div className="PostHeader__left">
          <Avatar src={this.props.avatar} />
        </div>
        <div className="PostHeader__right">
          <div className="PostHeader__user">{this.props.userName}</div>
          <div className="PostHeader__date">{this.props.createdAt}</div>
        </div>

        <a className="PostHeader__menu-btn" onClick={this.onMenuBtnClick}>
          <span className="fa fa-ellipsis-v" />
        </a>
        {this.state.isMenuVisible && <PostHeaderMenu onMount={this.onMenuMount} onClose={this.toggleMenu} />}
      </div>
    );
  }
}

export default PostHeader;
