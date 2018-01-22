// @flow
import * as React from 'react';
import { fabric } from 'fabric';

import Panel from '../Panel/Panel';

import ToolbarButton from './MemeMakerToolbarButton';
import Spinner from '../Spinner/Spinner';
import ColorPicker from '../ColorPicker/ColorPicker';
import Tooltip from '../Tooltip/Tooltip';

import icons from './icons.json';
import './MemeMaker.scss';

fabric.Object.prototype.cornerColor = '#5598F5';
fabric.Object.prototype.cornerSize = 6;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.rotatingPointOffset = 15;

const TYPE_ITEXT = 'i-text';
const ACTIONS_OFFSET_TOP = -30;
const ACTIONS_OFFSET_LEFT = -50;

type MemeMakerProps = {};

type MemeMakerState = {
  isDrawingMode: boolean,
  strokeSize: number,
  strokeColor: string,
  isSelectionGroup: boolean,
  fill: string,
};

class MemeMaker extends React.PureComponent<MemeMakerProps, MemeMakerState> {
  state = {
    isDrawingMode: false,
    strokeSize: 1,
    strokeColor: '#000',
    isSelectionGroup: false,
    fill: '#000',
  };

  componentWillMount() {
    if (document.body) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.style.overflow = 'auto';
    }
  }

  onCircleClick = () => {
    const object = new fabric.Circle({ ...this.defaultObjectOptions(), radius: 30 });
    this.addInCenter(object);
    this.disableDrawingMode();
  };

  onSquareClick = () => {
    const object = new fabric.Rect({ ...this.defaultObjectOptions(), width: 60, height: 60 });
    this.addInCenter(object);
    this.disableDrawingMode();
  };

  onPencilClick = () => {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    this.setState({ isDrawingMode: this.canvas.isDrawingMode });
  };

  onTextClick = () => {
    const object = new fabric.IText('Edit Text Here...', { ...this.defaultObjectOptions(), fontSize: 30 });
    this.addInCenter(object);
    this.disableDrawingMode();
  };

  onPointerClick = () => {
    this.disableDrawingMode();
  };

  onStrokeSizeChange = (strokeSize: number) => {
    this.setState({ strokeSize });
    this.canvas.freeDrawingBrush.width = strokeSize;
    this.setObjectProperties({ strokeWidth: strokeSize });
  };

  onStrokeColorChange = ({ color: strokeColor }: any) => {
    this.canvas.freeDrawingBrush.color = strokeColor;
    this.setState({ strokeColor });
    this.setObjectProperties({ stroke: strokeColor });
  };

  onFillColorChange = ({ color: fill }: any) => {
    this.setState({ fill });
    this.setObjectProperties({ fill });
  };

  onObjectMoveUp = () => {
    const { canvas } = this;
    canvas.bringForward(canvas.getActiveObject());
    canvas.bringForward(canvas.getActiveGroup());
  };

  onObjectMoveDown = () => {
    const { canvas } = this;
    canvas.sendBackwards(canvas.getActiveObject());
    canvas.sendBackwards(canvas.getActiveGroup());
  };

  onObjectFlipX = () => this.flipObject('x');

  onObjectFlipY = () => this.flipObject('y');

  onObjectClone = () => {
    this.selection.clone(clone => {
      this.canvas.add(clone);
    });
  };

  onObjectRemove = () => {
    const { canvas } = this;
    const group = canvas.getActiveGroup();
    if (group) {
      canvas.discardActiveGroup();
      group.getObjects().forEach(object => canvas.remove(object));
    } else if (canvas.getActiveObject()) {
      canvas.getActiveObject().remove();
    }
  };

  onLoadImage = (image: string) => {
    fabric.Image.fromURL(image, object => {
      this.addInCenter(object);
    });
  };

  setObjectProperties = (opts: Object) => {
    const group = this.canvas.getActiveGroup();

    if (group) {
      group.getObjects().forEach(object => object.set(opts));
    } else if (this.canvas.getActiveObject()) {
      this.canvas.getActiveObject().set(opts);
    }

    this.canvas.renderAll();
  };

  flipObject = (direction: 'x' | 'y') => {
    const group = this.canvas.getActiveGroup();
    const flipDirection = direction === 'x' ? 'flipX' : 'flipY';

    if (group) {
      group[flipDirection] = !group[flipDirection];
      this.canvas.renderAll();
    } else if (this.canvas.getActiveObject()) {
      this.canvas.getActiveObject()[flipDirection] = !this.canvas.getActiveObject()[flipDirection];
      this.canvas.renderAll();
    }
  };

  defaultObjectOptions = () => ({
    strokeWidth: this.state.strokeSize,
    stroke: this.state.strokeColor,
    fill: this.state.fill,
  });

  disableDrawingMode = () => {
    this.canvas.isDrawingMode = false;
    this.setState({ isDrawingMode: false });
  };

  addInCenter = (object: Object) => {
    this.canvas.centerObject(object);
    this.canvas.add(object);
    this.canvas.discardActiveObject();
    this.canvas.discardActiveGroup();
    this.canvas.renderAll();
    this.canvas.setActiveObject(object);
  };

  removeTextIfEmpty = (object: Object) => {
    if (object.text.length === 0) {
      this.canvas.remove(object);
    }
  };

  positionObjectActions = (x: number, y: number) => {
    const { objectActionsEl: el, selection } = this;

    if (!el || !selection) {
      return;
    }

    el.style.left = `${x + ACTIONS_OFFSET_LEFT}px`;
    el.style.top = `${y + ACTIONS_OFFSET_TOP - selection.getBoundingRectHeight() / 2}px`;
  };

  positionObjectActionToSelection() {
    if (!this.selection) {
      return;
    }

    this.calculateSelectionPosition();
    const matrix = this.selection.calcTransformMatrix();
    const x = matrix[4];
    const y = matrix[5];
    this.positionObjectActions(x, y);
  }

  calculateSelectionPosition = () => {
    const { canvasEl, selection } = this;

    if (!canvasEl || !selection) {
      return;
    }

    const matrix = selection.calcTransformMatrix();
    const x = matrix[4];
    const y = matrix[5];
    const { left, top } = canvasEl.getBoundingClientRect();

    this.selectionLeft = left + x;
    this.selectionTop = top + y;
  };

  attachEvents() {
    this.canvas.on('before:selection:cleared', e => {
      if (e.target.type === TYPE_ITEXT) {
        this.removeTextIfEmpty(e.target);
      }
    });

    this.canvas.on('selection:cleared', () => {
      this.selection = null;

      if (this.objectActionsEl) {
        this.objectActionsEl.style.display = 'none';
      }
    });

    this.canvas.on('object:selected', (e: any) => {
      this.selection = e.target;
      this.setState({
        isSelectionGroup: !!this.canvas.getActiveGroup(),
      });
      if (this.objectActionsEl) {
        this.objectActionsEl.style.display = 'block';
      }
      this.positionObjectActionToSelection();
    });

    this.canvas.on('object:modified', () => {
      this.positionObjectActionToSelection();
    });

    this.canvas.on('mouse:down', (e: any) => {
      this.isMouseDown = true;

      if (this.selection && this.objectActionsEl) {
        this.selectionLeftDiff = e.e.clientX - this.selectionLeft;
        this.selectionTopDiff = e.e.clientY - this.selectionTop;
        this.objectActionsEl.style.display = 'none';
      }
    });

    this.canvas.on('mouse:up', () => {
      this.isMouseDown = false;
      this.calculateSelectionPosition();

      if (this.selection && this.objectActionsEl) {
        this.objectActionsEl.style.display = 'block';
      }
    });

    this.canvas.on('mouse:move', (e: any) => {
      const { canvasEl } = this;

      if (!canvasEl) {
        return;
      }

      const { left, top } = canvasEl.getBoundingClientRect();

      if (this.isMouseDown) {
        this.positionObjectActions(
          e.e.clientX - left - this.selectionLeftDiff,
          e.e.clientY - top - this.selectionTopDiff
        );
      }
    });
  }

  canvas: any;
  canvasEl: ?HTMLCanvasElement;
  objectActionsEl: ?HTMLDivElement;
  selection: any;
  selectionTop: number;
  selectionLeft: number;
  selectionTopDiff: number;
  selectionLeftDiff: number;
  isMouseDown: boolean;

  render() {
    return (
      <div className="MemeMaker">
        <div className="MemeMaker__toolbar">
          <div className="MemeMaker__buttons">
            <ToolbarButton title="select" icon="fa-mouse-pointer" onClick={this.onPointerClick} />
            <ToolbarButton title="square" icon="fa-square" onClick={this.onSquareClick} />
            <ToolbarButton title="circle" icon="fa-circle" onClick={this.onCircleClick} />
            <ToolbarButton
              title="circle"
              icon="fa-pencil"
              onClick={this.onPencilClick}
              isActive={this.state.isDrawingMode}
            />
            <ToolbarButton title="text" icon="fa-font" onClick={this.onTextClick} />
          </div>

          <div className="MemeMaker__toolbar-set">
            <strong className="MemeMaker__toolbar-label">Stroke Size</strong>
            <Spinner min={1} max={50} value={this.state.strokeSize} onChange={this.onStrokeSizeChange} />
          </div>

          <div className="MemeMaker__toolbar-set">
            <strong className="MemeMaker__toolbar-label">Fill Color</strong>
            <ColorPicker color={this.state.fill} onChange={this.onFillColorChange} />
          </div>

          <div className="MemeMaker__toolbar-set">
            <strong className="MemeMaker__toolbar-label">Stroke Color</strong>
            <ColorPicker color={this.state.strokeColor} onChange={this.onStrokeColorChange} />
          </div>
        </div>

        <Panel classNameMain="MemeMaker__panel" className="MemeMaker__panel-content" title="Meme Maker">
          <div
            className="MemeMaker__object-actions"
            ref={el => {
              this.objectActionsEl = el;
            }}
          >
            <Tooltip title="bring forward">
              <button className="MemeMaker__object-action" onClick={this.onObjectMoveUp}>
                <span className="fa fa-arrow-up" />
              </button>
            </Tooltip>
            <Tooltip title="send backward">
              <button className="MemeMaker__object-action" onClick={this.onObjectMoveDown}>
                <span className="fa fa-arrow-down" />
              </button>
            </Tooltip>
            <Tooltip title="flip horizontally">
              <button className="MemeMaker__object-action" onClick={this.onObjectFlipX}>
                <span className="fa fa-exchange" />
              </button>
            </Tooltip>
            <Tooltip title="flip vertically">
              <button className="MemeMaker__object-action" onClick={this.onObjectFlipY}>
                <span className="fa fa-exchange fa-rotate-90" />
              </button>
            </Tooltip>
            <Tooltip title="clone">
              <button className="MemeMaker__object-action" onClick={this.onObjectClone}>
                <span className="fa fa-clone" />
              </button>
            </Tooltip>
            <Tooltip title="remove">
              <button className="MemeMaker__object-action" onClick={this.onObjectRemove}>
                <span className="fa fa-trash" />
              </button>
            </Tooltip>
          </div>

          <div className="MemeMaker__preset-images">
            <div className="MemeMaker__preset-images-inner">
              {icons.map(icon => (
                <button className="MemeMaker__preset-image-button" key={icon} onClick={() => this.onLoadImage(icon)}>
                  <img className="MemeMaker__preset-image" src={icon} />
                </button>
              ))}
            </div>
          </div>

          <canvas
            width="650"
            height="650"
            className="MemeMaker__canvas"
            ref={(el: ?HTMLCanvasElement) => {
              if (!this.canvas) {
                this.canvasEl = el;
                this.canvas = new fabric.Canvas(el);
                this.attachEvents();
                window.canvas = this.canvas;
              }
            }}
          />
        </Panel>
      </div>
    );
  }
}

export default MemeMaker;
