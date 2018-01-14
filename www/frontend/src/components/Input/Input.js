// @flow
import * as React from 'react';
import classnames from 'classnames';

import './Input.scss';

type InputProps = {
  value: string,
  className?: string,
  placeholder?: string,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

type InputState = {
  value: string,
  focused: boolean,
};

class Input extends React.PureComponent<InputProps, InputState> {
  state = {
    value: '',
    focused: false,
  };

  componentWillMount() {
    const value = this.props.value || '';
    this.setState({
      value,
      focused: !!value.length,
    });
  }

  onChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const focused = e.currentTarget.value.length ? true : this.state.focused;
    this.setState({ value, focused });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  onFocus = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  onBlur = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (!this.state.value.length) {
      this.setState({ focused: false });
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  render() {
    const { className, placeholder, ...props } = this.props;

    const isFocused = this.state.focused;

    return (
      <div className={classnames('Input', isFocused && 'Input--focused', className)}>
        <input
          {...props}
          value={this.state.value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className="Input__input"
        />
        {placeholder && <label className="Input__label">{placeholder}</label>}
      </div>
    );
  }
}

export default Input;
