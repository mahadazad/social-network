// @flow
import * as React from 'react';
import classnames from 'classnames';

import Tooltip from '../Tooltip/Tooltip';

import './MemeMakerToolbarButton.scss';

type ToolbarButtonProps = {
  title: string,
  icon: string,
  onClick: Function,
  className?: any,
  isActive?: boolean,
};

const MemeMakerToolbarButton = ({ title, icon, onClick, className, isActive }: ToolbarButtonProps) => (
  <Tooltip className="MemeMakerToolbarButton__tooltip" title={title}>
    <button
      className={classnames(
        'MemeMakerToolbarButton__button',
        { 'MemeMakerToolbarButton__button--active': isActive },
        className
      )}
      onClick={onClick}
    >
      <span className={`fa ${icon}`} />
    </button>
  </Tooltip>
);

MemeMakerToolbarButton.defaultProps = {
  className: null,
  isActive: false,
};

export default MemeMakerToolbarButton;
