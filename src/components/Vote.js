import React from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Vote extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  hasVotedFor(activity) {
    return this.props.hasVoted === activity;
  }

  render() {
    const activities = this.getPair().map((activity) => {
      return (
        <button key={activity}
                onClick={() => this.props.vote(activity)}
                disabled={this.isDisabled()}>
          <h1>{activity}</h1>
          {this.hasVotedFor(activity) ? <div className='label'>Voted</div> : null}
        </button>
      );
    });

    return (
      <div className='voting'>
        {activities}
      </div>
    );
  }
}
