import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './PostHeaderMenu.css';

const ESC_KEY = 27;

class PostHeaderMenu extends React.PureComponent {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this.el);
    document.addEventListener('keydown', this.onKeyDown)
  }

  render() {
    return ReactDOM.createPortal([
      <div key="PostHeaderMenu"
           className="PostHeaderMenu"
           ref={el => (this.el = el)}>
        <a className="PostHeaderMenu__item">Edit</a>
        <a className="PostHeaderMenu__item">Delete</a>
      </div>,
      <div key="PostHeaderMenu__overlay"
           className="PostHeaderMenu__overlay"
           onClick={this.close}/>
    ], document.body);
  }

  close = () => {
    this.props.onClose && this.props.onClose();
  };

  onKeyDown = (e) => {
    if (e.keyCode === ESC_KEY) {
      this.close();
    }
  };
}

PostHeaderMenu.propTypes = {
  onMount: PropTypes.func,
  onClose: PropTypes.func,
};

export default PostHeaderMenu;
