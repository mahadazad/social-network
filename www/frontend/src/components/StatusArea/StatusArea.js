import React from 'react';

import MessageArea from '../../components/MessageArea/MessageArea';
import Button from '../../components/Button/Button';

import './StatusArea.css';

import Panel from '../Panel/Panel';

class StatusArea extends React.PureComponent {
  state = {
    isFocused: false,
  };

  render() {
    return (
      <div className="StatusArea">
        <Panel title="Status" footer={
          <Button disabled={!this.state.isFocused}>Post</Button>
        }>
            <div className="StatusArea__input">
              <MessageArea placeholder="Post a new status..."
                           onFocusChange={this.onFocusChange}/>
            </div>
        </Panel>
      </div>
    );
  }

  onFocusChange = (isFocused) => {
    this.setState({ isFocused });
  };
}

export default StatusArea;
