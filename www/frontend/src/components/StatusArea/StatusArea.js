// @flow
import * as React from 'react';

import MessageArea from '../../components/MessageArea/MessageArea';
import Button from '../../components/Button/Button';

import Panel from '../Panel/Panel';

import './StatusArea.scss';

type StatusAreaState = {
  isFocused?: boolean,
};

class StatusArea extends React.PureComponent<{}, StatusAreaState> {
  state = {
    isFocused: false,
  };

  onFocusChange = (isFocused: boolean) => {
    this.setState({ isFocused });
  };

  render() {
    return (
      <div className="StatusArea">
        <Panel title="Status" footer={<Button disabled={!this.state.isFocused}>Post</Button>}>
          <div className="StatusArea__input">
            <MessageArea placeholder="Post a new status..." onFocusChange={this.onFocusChange} />
          </div>
        </Panel>
      </div>
    );
  }
}

export default StatusArea;
