import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

require('./styles/main.css'); // Style mixin

const pair = ['Watch a movie', 'Go to dinner'];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
