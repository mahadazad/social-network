// @flow
import * as React from 'react';
import { fabric } from 'fabric';

import Panel from '../Panel/Panel';

import MemeMakerImages from './MemeMakerImages';
import MemeMakerObjectActions from './MemeMakerObjectActions';
import MemeMakerToolbar from './MemeMakerToolbar';

import './MemeMaker.scss';

fabric.Object.prototype.cornerColor = '#5598F5';
fabric.Object.prototype.cornerSize = 6;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.rotatingPointOffset = 15;

const TYPE_ITEXT = 'i-text';
const ESC_KEY = 27;
const ACTIONS_OFFSET_TOP = -30;
const ACTIONS_OFFSET_LEFT = -50;

type MemeMakerProps = {
  onClose?: ?Function,
};

type MemeMakerState = {
  isDrawingMode: boolean,
  strokeSize: number,
  strokeColor: string,
  isSelectionGroup: boolean,
  fill: string,
  isImagePresetOpen: boolean,
};

class MemeMaker extends React.PureComponent<MemeMakerProps, MemeMakerState> {
  state = {
    isDrawingMode: false,
    strokeSize: 1,
    strokeColor: '#000',
    isSelectionGroup: false,
    fill: '#000',
    isImagePresetOpen: false,
  };

  componentWillMount() {
    if (document.body) {
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.style.overflow = 'auto';
    }

    document.removeEventListener('keydown', this.onEsc);
  }

  onEsc = (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEY && this.props.onClose) {
      this.props.onClose();
    }
  };

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

  onImagePresetClick = () => {
    this.setState(state => ({
      isImagePresetOpen: !state.isImagePresetOpen,
    }));
  };

  onImageUpload = (data: any) => {
    fabric.Image.fromURL(data, img => {
      this.addInCenter(img);
    });
  };

  onToolbarActionClick = (type: string, ...args: any) => {
    switch (type) {
      case 'square':
        this.onSquareClick(...args);
        break;
      case 'circle':
        this.onCircleClick(...args);
        break;
      case 'pencil':
        this.onPencilClick(...args);
        break;
      case 'text':
        this.onTextClick(...args);
        break;
      case 'stroke-size':
        this.onStrokeSizeChange(...args);
        break;
      case 'fill':
        this.onFillColorChange(...args);
        break;
      case 'stroke-color':
        this.onStrokeColorChange(...args);
        break;
      case 'preset-images':
        this.onImagePresetClick(...args);
        break;
      case 'upload-image':
        this.onImageUpload(...args);
        break;
      default:
        this.onPointerClick(...args);
    }
  };

  onActionClick = (type: string) => {
    switch (type) {
      case 'move-up':
        this.onObjectMoveUp();
        break;
      case 'move-down':
        this.onObjectMoveDown();
        break;
      case 'flip-x':
        this.onObjectFlipX();
        break;
      case 'flip-y':
        this.onObjectFlipY();
        break;
      case 'clone':
        this.onObjectClone();
        break;
      default:
        this.onObjectRemove();
    }
  };

  onObjectRemove = () => {
    const { canvas } = this;
    const group = canvas.getActiveGroup();

    if (group) {
      canvas.discardActiveGroup();
      group.getObjects().forEach(object => canvas.remove(object));
    } else if (canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject());
    }
  };

  onLoadImage = (image: string) => {
    fabric.Image.fromURL(image, object => {
      this.addInCenter(object);
    });
  };

  onImagePresetClose = () => {
    this.setState({ isImagePresetOpen: false });
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
        <MemeMakerToolbar
          isDrawingMode={this.state.isDrawingMode}
          fill={this.state.fill}
          strokeColor={this.state.strokeColor}
          strokeSize={this.state.strokeSize}
          onActionClick={this.onToolbarActionClick}
        />

        <Panel classNameMain="MemeMaker__panel" className="MemeMaker__panel-content" title="Meme Maker">
          <MemeMakerObjectActions
            onMount={el => {
              this.objectActionsEl = el;
            }}
            onActionClick={this.onActionClick}
          />

          {this.state.isImagePresetOpen && (
            <MemeMakerImages onImageClick={this.onLoadImage} onClose={this.onImagePresetClose} />
          )}

          <div>
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
          </div>
        </Panel>
      </div>
    );
  }
}

export default MemeMaker;
