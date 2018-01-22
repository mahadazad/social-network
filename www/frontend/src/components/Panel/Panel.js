// @flow
import * as React from 'react';
import classnames from 'classnames';

import './Panel.scss';

type PanelProps = {
  title: string,
  header?: ?React.Node,
  className?: ?string,
  classNameMain?: ?string,
  padded?: ?boolean,
  children: React.Node,
  footer?: ?React.Node,
};

const Panel = (props: PanelProps) => (
  <div className={classnames('Panel', props.classNameMain)}>
    <div className="Panel__header Panel__header--bordered">
      {props.title}
      {props.header}
    </div>
    <div className={classnames({ 'Panel--padded': props.padded }, props.className)}>{props.children}</div>
    {props.footer && <div className="Panel__footer">{props.footer}</div>}
  </div>
);

export default Panel;
