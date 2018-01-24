// @flow
import * as React from 'react';

import Tooltip from '../Tooltip/Tooltip';

import './MemeMakerObjectActions.scss';

type MemeMakerObjectActionsProps = {
  onActionClick: Function,
  onMount?: ?Function,
};

const MemeMakerObjectActions = (props: MemeMakerObjectActionsProps) => (
  <div
    className="MemeMakerObjectActions"
    ref={el => {
      if (props.onMount) {
        props.onMount(el);
      }
    }}
  >
    <Tooltip title="bring forward">
      <button className="MemeMakerObjectActions__action" onClick={() => props.onActionClick('move-up')}>
        <span className="fa fa-arrow-up" />
      </button>
    </Tooltip>
    <Tooltip title="send backward">
      <button className="MemeMakerObjectActions__action" onClick={() => props.onActionClick('move-down')}>
        <span className="fa fa-arrow-down" />
      </button>
    </Tooltip>
    <Tooltip title="flip horizontally">
      <button className="MemeMakerObjectActions__action" onClick={() => props.onActionClick('flip-x')}>
        <span className="fa fa-exchange" />
      </button>
    </Tooltip>
    <Tooltip title="flip vertically">
      <button className="MemeMakerObjectActions__action" onClick={() => props.onActionClick('flip-y')}>
        <span className="fa fa-exchange fa-rotate-90" />
      </button>
    </Tooltip>
    <Tooltip title="clone">
      <button className="MemeMakerObjectActions__action" onClick={() => props.onActionClick('clone')}>
        <span className="fa fa-clone" />
      </button>
    </Tooltip>
    <Tooltip title="remove">
      <button className="MemeMakerObjectActions__action" onClick={() => props.onActionClick('remove')}>
        <span className="fa fa-trash" />
      </button>
    </Tooltip>
  </div>
);

MemeMakerObjectActions.defaultProps = {
  onMount: null,
};

export default MemeMakerObjectActions;
