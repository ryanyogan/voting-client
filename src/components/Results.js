import React from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import Winner from './Winner';

const VOTE_WIDTH_PERCENT = 8;

@pureRender
export class Results extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  getVotes(activity) {
    if (this.props.tally && this.props.tally.has(activity)) {
      return this.props.tally.get(activity);
    }
    return 0;
  }

  getVotesBlockWidth(activity) {
    return (this.getVotes(activity) * VOTE_WIDTH_PERCENT) + '%';
  }

  render() {
    const activities = this.getPair().map(activity =>
      <div key={activity} className='entry'>
        <h1>{activity}</h1>
        <div className='voteVisualization'>
          <div className='votesBlock' style={{width: this.getVotesBlockWidth(activity)}} />
        </div>
        <div className='voteCount'>
          {this.getVotes(activity)}
        </div>
      </div>
    );

    return this.props.winner ?
      <Winner ref='winner' winner={this.props.winner} /> :
      <div className='results'>
        <div className='tally'>
          {activities}
        </div>
        <div className='managment'>
          <button ref='next' className='next' onClick={this.props.next}>Next</button>
        </div>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(mapStateToProps)(Results);
