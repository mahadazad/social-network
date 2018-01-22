// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './Tooltip.scss';

type TooltipProps = {
  title: string,
  children: React.Node,
  position?: ?'top' | 'bottom',
  className?: string,
};

type TooltipState = {
  isHover: boolean,
};

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static defaultProps = {
    position: 'top',
  };

  state = {
    isHover: false,
  };

  componentDidMount() {
    const { el } = this;
    if (!el) {
      return;
    }
    el.addEventListener('mouseover', this.onMouseOver);
    el.addEventListener('mouseout', this.onMouseOut);
  }

  componentWillUnmount() {
    const { el } = this;
    if (!el) {
      return;
    }
    el.removeEventListener('mouseover', this.onMouseOver);
    el.removeEventListener('mouseout', this.onMouseOut);
  }

  onMouseOver = () => {
    this.setState({ isHover: true });
    this.placeTooltip();
  };

  onMouseOut = () => {
    this.setState({ isHover: false });

    if (!this.tooltip) {
      return;
    }
    this.tooltip.style.opacity = '0';
    window.removeEventListener('scroll', this.placeTooltip);
  };

  placeTooltip = () => {
    const { tooltip, el, props: { position } } = this;
    if (!tooltip || !el) {
      return;
    }

    const { width, height, top, left } = el.getBoundingClientRect();
    const { width: tooltipWidth, height: tooltipHeight } = tooltip.getBoundingClientRect();

    let offset = top + height + 2;
    if (position === 'top') {
      offset = top - tooltipHeight - 2;
    }

    tooltip.innerText = this.props.title;
    tooltip.style.top = `${window.pageYOffset + offset}px`;
    tooltip.style.left = `${left + width / 2 - tooltipWidth / 2}px`;
    tooltip.style.opacity = '1';

    window.addEventListener('scroll', this.placeTooltip);
  };

  el: ?HTMLElement;
  tooltip: ?HTMLDivElement;

  render() {
    let tooltip = null;
    if (this.state.isHover) {
      tooltip = ReactDOM.createPortal(
        <div
          className={classnames('Tooltip', this.props.className)}
          ref={el => {
            this.tooltip = el;
          }}
        >
          {this.props.title}
        </div>,
        // $FlowFixMe
        document.body
      );
    }

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
