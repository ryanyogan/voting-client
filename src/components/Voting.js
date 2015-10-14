import React from 'react';

export default class Voting extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  render() {
    const activities = this.getPair().map((activity) => {
      return (
        <button key={activity}>
          <h1>{activity}</h1>
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
