import React from 'react';

export default class Voting extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  render() {
    const entries = this.getPair().map(entry =>
      <button key={entry}>
        <h1>{entry}</h1>
      </button>
    );

    return (
      <div className='voting'>
        {entries}
      </div>
    );
  }
}
