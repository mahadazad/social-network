import React from 'react';
import classnames from 'classnames';

import './Input.css';

class Input extends React.PureComponent {
  state = {
    value: '',
    focused: false,
  };

  componentWillMount() {
    const value = this.props.value || '';
    this.setState({
      value,
      focused: !!value.length
    });
  }

  render() {
    const { className, placeholder, ...props } = this.props;

    const isFocused = this.state.focused;

    return (
      <div className={classnames('Input', isFocused && 'Input--focused', className)}>
        <input {...props}
               value={this.state.value}
               onChange={this.onChange}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               className="Input__input"/>
        {placeholder && <label className="Input__label">{placeholder}</label>}
      </div>
    );
  }

  onChange = (e) => {
    const value = e.target.value;
    const focused = !!e.target.value.length ? true : this.state.focused;
    this.setState({ value, focused });
    this.props.onChange && this.props.onChange(e);
  };

  onFocus = (e) => {
    this.setState({ focused: true });
    this.props.onFocus && this.props.onFocus(e);
  };

  onBlur = (e) => {
    if (!this.state.value.length) {
      this.setState({ focused: false });
    }
    this.props.onBlur && this.props.onBlur(e);
  };
}

export default Input;
