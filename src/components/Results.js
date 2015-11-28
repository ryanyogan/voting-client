import React from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Results extends React.Component {
  render() {
    return (
      <div>
        Hello from the results component, I work now...
      </div>
    );
  }
}
