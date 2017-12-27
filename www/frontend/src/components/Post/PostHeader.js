import React from 'react';

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
          <Avatar/>
        </div>
        <div className="PostHeader__right">
          <div className="PostHeader__user">Itchy</div>
          <div className="PostHeader__date">Yesterday at 7:44 PM</div>
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

export default PostHeader;
