import React from 'react';
import pureRender from 'pure-render-decorator';
import Winner from './Winner';
import Vote from './Vote';

@pureRender
export default class Voting extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  render() {
    return (
      <div>
      {this.props.winner ?
        <Winner ref='winner' winner={this.props.winner} /> :
        <Vote {...this.props} />}
      </div>
    );
  }
}
