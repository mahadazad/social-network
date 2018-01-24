// @flow
import * as React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';
import Spinner from '../Spinner/Spinner';
import ToolbarButton from './MemeMakerToolbarButton';

import './MemeMakerToolbar.scss';

type MemeMakerToolbarProps = {
  isDrawingMode: boolean,
  strokeSize: number,
  strokeColor: string,
  fill: string,
  onActionClick: Function, // eslint-disable-line react/no-unused-prop-types
};

const MemeMakerToolbar = (props: MemeMakerToolbarProps) => {
  let fileEl: ?HTMLInputElement;
  const actionClick = type => (...args) => props.onActionClick(type, ...args);
  const loadImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = f => {
      const data = f.target.result;
      props.onActionClick('upload-image', data);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="MemeMakerToolbar">
      <div className="MemeMakerToolbar__buttons">
        <ToolbarButton title="select" icon="fa-mouse-pointer" onClick={actionClick('select')} />
        <ToolbarButton title="square" icon="fa-square" onClick={actionClick('square')} />
        <ToolbarButton title="circle" icon="fa-circle" onClick={actionClick('circle')} />
        <ToolbarButton title="circle" icon="fa-pencil" onClick={actionClick('pencil')} isActive={props.isDrawingMode} />
        <ToolbarButton title="text" icon="fa-font" onClick={actionClick('text')} />
        <ToolbarButton title="images" icon="fa-snowflake-o" onClick={actionClick('preset-images')} />
        <ToolbarButton title="upload image" icon="fa-file-image-o" onClick={() => fileEl && fileEl.click()} />
      </div>

      <div className="MemeMakerToolbar__toolbar-set">
        <strong className="MemeMakerToolbar__toolbar-label">Stroke Size</strong>
        <Spinner min={1} max={50} value={props.strokeSize} onChange={actionClick('stroke-size')} />
      </div>

      <div className="MemeMakerToolbar__toolbar-set">
        <strong className="MemeMakerToolbar__toolbar-label">Fill Color</strong>
        <ColorPicker color={props.fill} onChange={actionClick('fill')} />
      </div>

      <div className="MemeMakerToolbar__toolbar-set">
        <strong className="MemeMakerToolbar__toolbar-label">Stroke Color</strong>
        <ColorPicker color={props.strokeColor} onChange={actionClick('stroke-color')} />
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={el => {
          fileEl = el;
        }}
        onChange={loadImage}
      />
    </div>
  );
};

export default MemeMakerToolbar;
