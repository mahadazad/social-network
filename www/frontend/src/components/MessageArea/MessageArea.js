import 'quill/dist/quill.core.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';

import './MessageArea.css';
import EmojiPicker from '../EmojiPicker/EmojiPicker';

class MessageArea extends Component {
  state = {
    isEmojiPickerVisible: false,
  };

  lastFocusStatus = false;

  componentDidMount() {
    this.editor = new Quill(this.el, {
      placeholder: this.props.placeholder
    });
    this.editor.on('text-change', this.onTextChange);
    this.editor.on('selection-change', this.onSelectionChange);
    window['editor'] = this.editor;
  }

  componentWillUnmount() {
    this.editor.off('text-change', this.onTextChange);
    this.editor.off('selection-change', this.onSelectionChange);
  }

  render() {
    return (
      <div className="MessageArea">
        <div className="MessageArea__editor"
             ref={el => this.el = el}>
        </div>

        <a className="MessageArea__smile"
           ref={el => (this.smileEl = el)}
           onClick={this.toggleEmojiPicker}>
          <span className="fa fa-smile-o"/>
        </a>

        {this.state.isEmojiPickerVisible &&
        <EmojiPicker onEmojiClick={this.onEmojiClick}
                     onOverlayClick={this.toggleEmojiPicker}
                     onMount={this.onEmojiPickerMount}/>}
      </div>
    );
  }

  onTextChange = () => {
    this.props.onTextChange && this.props.onTextChange(this.editor.getText());
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

  toggleEmojiPicker = () => {
    this.setState((prevState) => {
      const isEmojiPickerVisible = !prevState.isEmojiPickerVisible;

      if (!isEmojiPickerVisible) {
        this.editor.focus();
      }

      return { isEmojiPickerVisible };
    });
  };

  onEmojiPickerMount = (picker) => {
    const rect = this.smileEl.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + scrollTop - 5;
    const left = rect.left + scrollLeft - picker.offsetWidth + 24;

    picker.style.top = `${top}px`;
    picker.style.left = `${left}px`;
  };

  onEmojiClick = (emoji) => {
    const range = this.editor.getSelection(true);
    const emojiText = ` :${emoji.id}: `;
    this.editor.insertText(range.index, emojiText);
    this.editor.setSelection(range.index + emojiText.length, Quill.sources.SILENT);
    this.toggleEmojiPicker();
  };
}

MessageArea.defaultProps = {
  placeholder: '',
};

MessageArea.propTypes = {
  onTextChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default MessageArea;
