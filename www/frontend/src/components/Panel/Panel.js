import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Panel.css';

const Panel = (props) => {
  return (
    <div className="Panel">
      <div className="Panel__header Panel__header--bordered">
        {props.title}
        {props.header}
      </div>
      <div className={classnames({
        'Panel--padded': props.padded,
        [props.className]: props.className,
      })}>
        {props.children}
      </div>
      {props.footer && <div className="Panel__footer">
        {props.footer}
      </div>}
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
  padded: PropTypes.bool,
};

export default Panel;
