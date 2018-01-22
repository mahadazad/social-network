// @flow
import * as React from 'react';

import './Spinner.scss';

type SpinnerProps = {
  value?: number,
  min?: ?number,
  max?: ?number,
  onChange?: Function,
};

type SpinType = 'up' | 'down';

class Spinner extends React.PureComponent<SpinnerProps> {
  static defaultProps = {
    value: 0,
    min: null,
    max: null,
  };

  onKeyPress = (e: KeyboardEvent) => {
    const { inputEl } = this;
    const { charCode } = e;
    const { onChange } = this.props;

    if (!inputEl) {
      return;
    }

    if (!(charCode >= 48 && charCode <= 57) && charCode !== 45) {
      e.preventDefault();
      return;
    }

    if (onChange) {
      onChange(inputEl.value);
    }
  };

  onInputBlur = () => {
    const { inputEl } = this;

    if (!inputEl) {
      return;
    }

    let { value } = inputEl;
    value = parseInt(value, 10);
    const { min, max, onChange } = this.props;

    // $FlowFixMe
    if (Number.isFinite(max) && value > max) {
      value = max;
      inputEl.value = String(value);

      if (onChange) {
        onChange(inputEl.value);
      }
      // $FlowFixMe
    } else if (Number.isFinite(min) && value < min) {
      value = min;
      inputEl.value = String(value);
      if (onChange) {
        onChange(inputEl.value);
      }
    }
  };

  onUp = () => {
    this.spin('up');
  };

  onDown = () => {
    this.spin('down');
  };

  onUpMouseDown = () => {
    this.mouseDown('up');
  };

  onDownMouseDown = () => {
    this.mouseDown('down');
  };

  mouseDown = (type: SpinType) => {
    this.interval = setTimeout(() => {
      this.interval = setInterval(() => this.spin(type), 100);
    }, 500);
  };

  clearInterval = () => {
    clearInterval(this.interval);
  };

  spin = (type: SpinType) => {
    const { inputEl } = this;

    if (!inputEl) {
      return;
    }

    const mathFunc = type === 'up' ? Math.min : Math.max;
    const incrementBy = type === 'up' ? +1 : -1;
    const boundValue = this.props[type === 'up' ? 'max' : 'min'];
    const { onChange } = this.props;

    let value = parseInt(inputEl.value, 10) + incrementBy;

    if (Number.isFinite(boundValue)) {
      // $FlowFixMe
      value = mathFunc(value, boundValue);
    }

    inputEl.value = String(value);

    if (onChange) {
      onChange(value);
    }
  };

  inputEl: ?HTMLInputElement;
  interval: any;

  render() {
    return (
      <div className="Spinner">
        <input
          className="Spinner__input"
          defaultValue={this.props.value}
          ref={el => {
            this.inputEl = el;
          }}
          onBlur={this.onInputBlur}
          onKeyPress={this.onKeyPress}
        />
        <div className="Spinner__buttons">
          <button
            className="Spinner__button"
            onClick={this.onUp}
            onMouseDown={this.onUpMouseDown}
            onMouseUp={this.clearInterval}
          >
            <span className="fa fa-caret-up Spinner__icon" />
          </button>
          <button
            className="Spinner__button"
            onClick={this.onDown}
            onMouseDown={this.onDownMouseDown}
            onMouseUp={this.clearInterval}
          >
            <span className="fa fa-caret-down Spinner__icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default Spinner;
