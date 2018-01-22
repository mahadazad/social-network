// @flow
import * as React from 'react';
import ColorPickerComp from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

type ColorPickerProps = {
  color?: string,
  onChange?: Function,
};

class ColorPicker extends React.Component<ColorPickerProps> {
  static defaultProps = {
    color: '#000',
  };

  render() {
    const { color, onChange } = this.props;
    return <ColorPickerComp color={color} onChange={onChange} />;
  }
}

export default ColorPicker;
