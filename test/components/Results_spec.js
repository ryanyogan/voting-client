import React from 'react';
import ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import { Results } from '../../src/components/Results';
import { expect } from 'chai';

import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Batman', 'Ants');
    const tally = Map({'Batman': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [batman, ants] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(batman).to.contain('Batman');
    expect(batman).to.contain('5');
    expect(ants).to.contain('Ants');
    expect(ants).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Batman', 'Ants');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner='Batman'
               pair={['Batman', 'Ants']}
               tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Batman');
  });

});
