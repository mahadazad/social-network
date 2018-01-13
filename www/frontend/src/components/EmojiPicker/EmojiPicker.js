// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Picker } from 'emoji-mart';

import emojiSet from 'emoji-datasource-apple/img/apple/sheets-256/64.png';
import 'emoji-mart/css/emoji-mart.css';

import './EmojiPicker.css';

const ESC_KEY = 27;

type EmojiPickerProps = {
  onMount: Function,
  onEmojiClick: Function,
  onOverlayClick: Function,
};

class EmojiPicker extends React.Component<EmojiPickerProps> {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.el);
    }

    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.keyCode === ESC_KEY) {
      this.onOverlayClick();
    }
  };

  onOverlayClick = () => {
    if (this.props.onOverlayClick) {
      this.props.onOverlayClick();
    }
  };

  onEmojiClick = emoji => {
    if (this.props.onEmojiClick) {
      this.props.onEmojiClick(emoji);
    }
  };

  el = null;

  render() {
    return ReactDOM.createPortal(
      [
        <div
          key="picker"
          className="EmojiPicker"
          ref={el => {
            this.el = el;
          }}
        >
          <Picker title="" emoji="" onClick={this.onEmojiClick} backgroundImageFn={() => emojiSet} />
        </div>,
        <div key="overlay" className="EmojiPicker__overlay" onClick={this.onOverlayClick} />,
      ],
      document.body
    );
  }
}

export default EmojiPicker;
