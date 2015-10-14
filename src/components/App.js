import React from 'react';
import { List, Map } from 'immutable';

const pair = List.of('Drink Beer', 'Watch Movie');
const tally = Map({'Drink Beer': 10, 'Watch Movie': 2});

export default class App extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
}
