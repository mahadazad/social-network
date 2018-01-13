// @flow
import * as React from 'react';
import classnames from 'classnames';

import './Panel.css';

type PanelProps = {
  title: string,
  header: React.Node,
  className: string,
  padded: boolean,
  children: React.Node,
  footer: React.Node,
};

const Panel = (props: PanelProps) => (
  <div className="Panel">
    <div className="Panel__header Panel__header--bordered">
      {props.title}
      {props.header}
    </div>
    <div
      className={classnames({
        'Panel--padded': props.padded,
        [props.className]: props.className,
      })}
    >
      {props.children}
    </div>
    {props.footer && <div className="Panel__footer">{props.footer}</div>}
  </div>
);

export default Panel;
