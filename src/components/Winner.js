import React from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Winner extends React.Component {
  render() {
    return (
      <div className='winner'>
        Winner is {this.props.winner}
      </div>
    );
  }
}
