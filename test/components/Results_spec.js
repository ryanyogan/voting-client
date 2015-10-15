import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';

import { List, Map } from 'immutable';
import { expect } from 'chai';
import { Results } from '../../src/components/Results';

describe('Results', () => {

  it('renders activities with vote counts or zero', () => {
    const pair = List.of('Drink Beer', 'Drink Jack');
    const tally = Map({'Drink Beer': 10});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const activities = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [beer, jack] = activities.map(a => a.textContent);

    expect(activities.length).to.equal(2);
    expect(beer).to.contain('Drink Beer');
    expect(beer).to.contain('10');
    expect(jack).to.contain('Drink Jack');
    expect(jack).to.contain('0');
  });

  it('invokes the next callback when the next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Beer', 'Jack');
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winning activity when there is one', () => {
    const component = renderIntoDocument(
      <Results winner='Drink Beer' pair={['Drink Beer', 'Sleep']} tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Drink Beer');
  });

});
