import React from 'react';
import { List, Map } from 'immutable';

const pair = List.of('Batman', 'Ants');
const tally = Map({'Batman': 5, 'Ants': 1});

export default class App extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {pair: pair, tally: tally});
  }
}
