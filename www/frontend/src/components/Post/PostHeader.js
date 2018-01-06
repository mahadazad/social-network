import React from 'react';
import PropTypes from 'prop-types';

import './PostHeader.css';

import Avatar from '../Avatar/Avatar';
import PostHeaderMenu from './PostHeaderMenu';

class PostHeader extends React.PureComponent {
  state = {
    isMenuVisible: false,
  };

  lastX = 0;
  lastY = 0;

  render() {
    return (
      <div className="PostHeader">
        <div className="PostHeader__left">
          <Avatar src={this.props.avatar}/>
        </div>
        <div className="PostHeader__right">
          <div className="PostHeader__user">{this.props.userName}</div>
          <div className="PostHeader__date">{this.props.createdAt}</div>
        </div>

        <a className="PostHeader__menu-btn"
           onClick={this.onMenuBtnClick}>
          <span className="fa fa-ellipsis-v"/>
        </a>
        {this.state.isMenuVisible && <PostHeaderMenu onMount={this.onMenuMount}
                                                     onClose={this.toggleMenu}/>}
      </div>
    );
  }

  toggleMenu = () => {
    this.setState((state) => {
      return {
        isMenuVisible: !state.isMenuVisible,
      };
    });
  };

  onMenuMount = (el) => {
    el.style.top = `${this.lastY}px`;
    el.style.left = `${this.lastX}px`;
  };

  onMenuBtnClick = (e) => {
    const winX = window.pageXOffset || document.documentElement.scrollLeft;
    const winY = window.pageYOffset || document.documentElement.scrollTop;
    this.lastX = winX + e.clientX;
    this.lastY = winY + e.clientY;
    this.toggleMenu();
  };
}

PostHeader.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  createdAt: PropTypes.string,
};

export default PostHeader;
