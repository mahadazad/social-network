import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Tooltip.css';

class Tooltip extends React.PureComponent {
  componentDidMount() {
    this.el.addEventListener('mouseover', this.onMouseOver);
    this.el.addEventListener('mouseout', this.onMouseOut);
  }

  componentWillUnmount() {
    this.el.removeEventListener('mouseover', this.onMouseOver);
    this.el.removeEventListener('mouseout', this.onMouseOut);
  }

  render() {
      const tooltip = ReactDOM.createPortal(
        <div className="Tooltip"
             ref={el => (this.tooltip = el)}>{this.props.title}</div>,
        document.body
      );

    const component = (
      <Fragment>
        {tooltip}
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            ref: (el) => {
              if (child.ref) {
                child.ref(el);
              }

              this.el = el;
            }
          });
        })}
      </Fragment>
    );

    return component;
  }

  onMouseOver = () => {
    this.tooltip.innerText = this.props.title;
    this.tooltip.style.top = `${this.el.offsetTop + this.el.offsetHeight + 3}px`;
    this.tooltip.style.left = `${this.el.offsetLeft + this.el.offsetWidth / 2 -  this.tooltip.offsetWidth / 2}px`;
    this.tooltip.style.opacity = 1;
  };

  onMouseOut = () => {
    this.tooltip.style.opacity = 0;
  };
}

Tooltip.propTypes = {
  title: PropTypes.string,
};

export default Tooltip;
