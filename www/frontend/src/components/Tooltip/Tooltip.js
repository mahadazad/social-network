// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import './Tooltip.scss';

type TooltipProps = {
  title: string,
  children: React.Node,
};

class Tooltip extends React.PureComponent<TooltipProps> {
  componentDidMount() {
    const el = this.el;
    if (!el) {
      return;
    }
    el.addEventListener('mouseover', this.onMouseOver);
    el.addEventListener('mouseout', this.onMouseOut);
  }

  componentWillUnmount() {
    const el = this.el;
    if (!el) {
      return;
    }
    el.removeEventListener('mouseover', this.onMouseOver);
    el.removeEventListener('mouseout', this.onMouseOut);
  }

  onMouseOver = () => {
    const tooltip = this.tooltip;
    const el = this.el;
    if (!tooltip || !el) {
      return;
    }
    tooltip.innerText = this.props.title;
    tooltip.style.top = `${el.offsetTop + el.offsetHeight + 3}px`;
    tooltip.style.left = `${el.offsetLeft + el.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.opacity = '1';
  };

  onMouseOut = () => {
    if (!this.tooltip) {
      return;
    }
    this.tooltip.style.opacity = '0';
  };

  el: ?HTMLElement;
  tooltip: ?HTMLDivElement;

  render() {
    const tooltip = ReactDOM.createPortal(
      <div
        className="Tooltip"
        ref={el => {
          this.tooltip = el;
        }}
      >
        {this.props.title}
      </div>,
      // $FlowFixMe
      document.body
    );

    const component = (
      <React.Fragment>
        {tooltip}
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            ref: el => {
              if (child.ref) {
                child.ref(el);
              }

              this.el = el;
            },
          })
        )}
      </React.Fragment>
    );

    return component;
  }
}

export default Tooltip;
