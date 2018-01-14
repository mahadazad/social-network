// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Picker } from 'emoji-mart';

import emojiSet from 'emoji-datasource-apple/img/apple/sheets-256/64.png';
import 'emoji-mart/css/emoji-mart.css';

import './EmojiPicker.scss';

const ESC_KEY = 27;

type EmojiPickerProps = {
  onMount?: Function,
  onEmojiClick: Function,
  onOverlayClick?: Function,
};

export type Emoji = {
  colons: string,
  emoticons: Array<string>,
  id: string,
  name: string,
  native: string,
  skin: ?string,
  unified: string,
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

  onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEY) {
      this.onOverlayClick();
    }
  };

  onOverlayClick = () => {
    if (this.props.onOverlayClick) {
      this.props.onOverlayClick();
    }
  };

  onEmojiClick = (emoji: Emoji) => {
    if (this.props.onEmojiClick) {
      this.props.onEmojiClick(emoji);
    }
  };

  el: any;

  render() {
    const bodyEl = document.body;

    if (!bodyEl) {
      return null;
    }

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
      bodyEl
    );
  }
}

export default EmojiPicker;
