import React from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';

@pureRender
export class Voting extends React.Component {
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

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(mapStateToProps)(Voting);
