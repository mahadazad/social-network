import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';

import emojiSet from 'emoji-datasource-apple/img/apple/sheets-256/64.png';
import 'emoji-mart/css/emoji-mart.css';
import './EmojiPicker.css';

const ESC_KEY = 27;

class EmojiPicker extends React.Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this.el);
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  render() {
    return ReactDOM.createPortal(
      [
        <div key="picker"
             className="EmojiPicker"
             ref={el => (this.el = el)}>
          <Picker title=""
                  emoji=""
                  onClick={this.onEmojiClick}
                  backgroundImageFn={() => emojiSet}/>
        </div>,
        <div key="overlay"
             className="EmojiPicker__overlay"
             onClick={this.onOverlayClick} />
      ],
      document.body
    );
  }

  onKeyDown = (e) => {
    if (e.keyCode === ESC_KEY) {
      this.onOverlayClick();
    }
  };

  onOverlayClick = () => {
    this.props.onOverlayClick && this.props.onOverlayClick();
  };

  onEmojiClick = (emoji) => {
    this.props.onEmojiClick && this.props.onEmojiClick(emoji);
  };
}

EmojiPicker.propTypes = {
  onMount: PropTypes.func,
  onEmojiClick: PropTypes.func,
  onOverlayClick: PropTypes.func,
};

export default EmojiPicker;
