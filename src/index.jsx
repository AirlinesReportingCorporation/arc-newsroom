import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import Newsroom from './app';
import "./scss/main.scss";

var mountNode = document.getElementById('app');
var value = document.getElementById('app').getAttribute("episode");

console.log(value);
ReactDOM.render(<Newsroom />, mountNode); 