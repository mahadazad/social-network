// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import MessageArea from '../../components/MessageArea/MessageArea';
import Button from '../../components/Button/Button';

import Panel from '../Panel/Panel';
import MemeMaker from '../MemeMaker/MemeMaker';
import MemeIcon from '../Icons/Meme';

import './StatusArea.scss';

type StatusAreaState = {
  isFocused: boolean,
  isMemeMakerOpen: boolean,
};

class StatusArea extends React.PureComponent<{}, StatusAreaState> {
  state = {
    isFocused: false,
    isMemeMakerOpen: false,
  };

  onFocusChange = (isFocused: boolean) => {
    this.setState({ isFocused });
  };

  toggleMemeMaker = () => {
    this.setState(state => ({
      isMemeMakerOpen: !state.isMemeMakerOpen,
    }));
  };

  closeMemeMaker = () => {
    this.setState({ isMemeMakerOpen: false });
  };

  renderFooter = () => (
    <div className="StatusArea__footer">
      <button className="StatusArea__footer-button" onClick={this.toggleMemeMaker}>
        <MemeIcon width="34" />
      </button>
      <Button disabled={!this.state.isFocused}>Post</Button>
    </div>
  );

  render() {
    if (!document.body) {
      return null;
    }

    const memeMaker =
      this.state.isMemeMakerOpen && ReactDOM.createPortal(<MemeMaker onClose={this.closeMemeMaker} />, document.body);

    return (
      <div className="StatusArea">
        <Panel title="Status" footer={this.renderFooter()}>
          <div className="StatusArea__input">
            <MessageArea placeholder="Post a new status..." onFocusChange={this.onFocusChange} />
          </div>
        </Panel>
        {memeMaker}
      </div>
    );
  }
}

export default StatusArea;
