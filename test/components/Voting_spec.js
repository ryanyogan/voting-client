import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { List, fromJS } from 'immutable';

import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';

import { Voting } from '../../src/components/Voting';

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

  it('disables buttons when a user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['Eat Dinner', 'Dance']} hasVoted='Eat Dinner' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds a voted label to the voted activity', () => {
    const component = renderIntoDocument(
      <Voting pair={['Eat Dinner', 'Dance']} hasVoted='Eat Dinner' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is only one activity', () => {
    const component = renderIntoDocument(
      <Voting winner='Eat Dinner' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Eat Dinner');
  });

  it('renders as a pure component', () => {
    const pair = ['Eat Dinner', 'Go Out'];
    const component = <Voting pair={pair} />;
    const div = document.createElement('div');
    let renderedComponent = ReactDOM.render(component, div);

    let firstButton = scryRenderedDOMComponentsWithTag(renderedComponent, 'button')[0];
    expect(firstButton.textContent).to.equal('Eat Dinner');

    pair[0] = 'Do Not Eat Dinner';
    renderedComponent = ReactDOM.render(component, div);
    firstButton = scryRenderedDOMComponentsWithTag(renderedComponent, 'button')[0];
    expect(firstButton.textContent).to.equal('Eat Dinner');
  });

  it('does update DOM when the prop changes', () => {
    const pair = List.of('Eat Dinner', 'Go Out');
    const div = document.createElement('div');
    let component = <Voting pair={pair} />;
    let renderedComponent = ReactDOM.render(component, div);

    let firstButton = scryRenderedDOMComponentsWithTag(renderedComponent, 'button')[0];
    expect(firstButton.textContent).to.equal('Eat Dinner');

    const newPair = pair.set(0, 'Sleep');
    component = <Voting pair={newPair} />;
    renderedComponent = ReactDOM.render(component, div);
    firstButton = scryRenderedDOMComponentsWithTag(renderedComponent, 'button')[0];
    expect(firstButton.textContent).to.equal('Sleep');
  });

});
