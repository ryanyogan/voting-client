import React from 'react';
import pureRender from 'pure-render-decorator';
import Winner from './Winner';
import { connect } from 'react-redux';

@pureRender
export class Results extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }

  render() {
    const entries = this.getPair().map(entry =>
      <div key={entry} className='tally'>
        <div className='entry'>
          <h1>{entry}</h1>
          <div className='voteCount'>
            {this.getVotes(entry)}
          </div>
        </div>
      </div>
    );

    return this.props.winner ?
      <Winner ref='winner' winner={this.props.winner} /> :
      <div className='results'>
        <div>
          {entries}
        </div>
        <div className='management'>
          <button ref='next'
                  className='next'
                  onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>;
  }
}

@connect(mapStateToProps)
export class ResultsContainer extends Results {
  constructor(props) {
    super(props);
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}
