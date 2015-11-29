import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';

@pureRender
export class Voting extends React.Component {
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

@connect(mapStateToProps)
export class VotingContainer extends Voting {
  constructor(props) {
    super(props);
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}
