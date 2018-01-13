// @flow
import 'quill/dist/quill.core.css';

import React, { Component } from 'react';
import Quill from 'quill';
import classnames from 'classnames';

import EmojiPicker from '../EmojiPicker/EmojiPicker';

import './MessageArea.css';

type MessageAreaProps = {
  className?: string,
  onEnter?: Function,
  onTextChange?: Function,
  onFocusChange?: Function,
  onCreate?: Function,
  placeholder?: string,
};

type MessageAreaState = {
  isEmojiPickerVisible: boolean,
};

class MessageArea extends Component<MessageAreaProps, MessageAreaState> {
  static defaultProps = {
    placeholder: '',
  };

  state = {
    isEmojiPickerVisible: false,
  };

  componentDidMount() {
    const bindings = {
      enter: {
        key: 13,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        handler: () => {
          const { onEnter } = this.props;
          if (onEnter) {
            onEnter(this.editor.getText());
          }
          return false;
        },
      },
    };

    this.editor = new Quill(this.el, {
      placeholder: this.props.placeholder,
      modules: {
        keyboard: {
          bindings,
        },
      },
    });

    this.editor.on('text-change', this.onTextChange);
    this.editor.on('selection-change', this.onSelectionChange);
    window['editor'] = this.editor;
    if (this.props.onCreate) {
      this.props.onCreate(this);
    }
  }

  componentWillUnmount() {
    this.editor.off('text-change', this.onTextChange);
    this.editor.off('selection-change', this.onSelectionChange);
  }

  onTextChange = () => {
    if (this.props.onTextChange) {
      this.props.onTextChange(this.editor.getText());
    }
  };

  onSelectionChange = () => {
    const currentFocusStatus = this.editor.hasFocus();

    if (!!this.props.onFocusChange && currentFocusStatus !== this.lastFocusStatus) {
      this.props.onFocusChange(currentFocusStatus);
    }

    if (currentFocusStatus) {
      this.editor.root.setAttribute('data-placeholder', '');
    } else {
      this.editor.root.setAttribute('data-placeholder', this.props.placeholder);
    }

    this.lastFocusStatus = currentFocusStatus;
  };

  onEmojiPickerMount = picker => {
    const rect = this.smileEl.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + scrollTop - 5;
    const left = rect.left + scrollLeft - picker.offsetWidth + 24;

    picker.style.top = `${top}px`;
    picker.style.left = `${left}px`;
  };

  onEmojiClick = emoji => {
    const range = this.editor.getSelection(true);
    const emojiText = ` :${emoji.id}: `;
    this.editor.insertText(range.index, emojiText);
    this.editor.setSelection(range.index + emojiText.length, Quill.sources.SILENT);
    this.toggleEmojiPicker();
  };

  toggleEmojiPicker = () => {
    this.setState(prevState => {
      const isEmojiPickerVisible = !prevState.isEmojiPickerVisible;

      if (!isEmojiPickerVisible) {
        this.editor.focus();
      }

      return { isEmojiPickerVisible };
    });
  };

  editor = null;
  lastFocusStatus = false;

  render() {
    return (
      <div className={classnames('MessageArea', this.props.className)}>
        <div
          className="MessageArea__editor"
          ref={el => {
            this.el = el;
          }}
        />

        <a
          className="MessageArea__smile"
          ref={el => {
            this.smileEl = el;
          }}
          onClick={this.toggleEmojiPicker}
        >
          <span className="fa fa-smile-o" />
        </a>

        {this.state.isEmojiPickerVisible && (
          <EmojiPicker
            onEmojiClick={this.onEmojiClick}
            onOverlayClick={this.toggleEmojiPicker}
            onMount={this.onEmojiPickerMount}
          />
        )}
      </div>
    );
  }
}

export default MessageArea;
