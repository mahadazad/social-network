// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import './PostHeaderMenu.scss';

const ESC_KEY = 27;

type PostHeaderMenuProps = {
  onMount: Function,
  onClose: Function,
};

class PostHeaderMenu extends React.PureComponent<PostHeaderMenuProps> {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.el);
    }

    document.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEY) {
      this.close();
    }
  };

  close = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  el: ?HTMLElement;

  render() {
    return ReactDOM.createPortal(
      [
        <div
          key="PostHeaderMenu"
          className="PostHeaderMenu"
          ref={el => {
            this.el = el;
          }}
        >
          <a className="PostHeaderMenu__item">Edit</a>
          <a className="PostHeaderMenu__item">Delete</a>
        </div>,
        <div key="PostHeaderMenu__overlay" className="PostHeaderMenu__overlay" onClick={this.close} />,
      ],
      // $FlowFixMe
      document.body
    );
  }
}

export default PostHeaderMenu;
