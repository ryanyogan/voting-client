import React from 'react';
import { expect } from 'chai';

import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';

import Voting from '../../src/components/Voting';

describe('Voting', () => {

  it('renders a pair of buttons to vote on', () => {
    const component = renderIntoDocument(
      <Voting pair={['Eat Dinner', 'Dance']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Eat Dinner');
    expect(buttons[1].textContent).to.equal('Dance');
  });

  it('invokes a callback prop when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['Eat Dinner', 'Dance']} vote={vote} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Eat Dinner');
  });

});
