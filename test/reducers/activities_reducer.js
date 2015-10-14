import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../../src/reducers/activities_reducer';

describe('Activities Reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Drink Beer', 'Sleep'),
          tally: Map({'Drink Beer': 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Drink Beer', 'Sleep'],
        tally: { 'Drink Beer': 1 }
      }
    }));
  });

  it('handles SET_STATE with vanilla js payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Drink Beer', 'Sleep'],
          tally: { 'Drink Beer': 1 }
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Drink Beer', 'Sleep'],
        tally: { 'Drink Beer': 1 }
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Drink', 'Sleep'],
          tally: { Drink: 1 }
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Drink', 'Sleep'],
        tally: {'Drink': 1}
      }
    }));
  });

});
