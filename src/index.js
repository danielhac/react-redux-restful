/*eslint-disable import/default */
// Code above to avoid ESLint issues

import 'babel-polyfill'; // Some features in ES6 that Babel cannot transpile, thus polyfill
import React from 'react'; // To use React
import { render } from 'react-dom'; // To allow render function working in browser

import configureStore from './store/configureStore.dev';
import {Provider} from 'react-redux'; // higher order component that attaches our store to React container components

import { Router, browserHistory } from 'react-router'; // Router: needed as coded in render below - browserHistory: clean urls
import routes from './routes'; // Passing in routes.js shown in render below

import {loadWines} from './actions/wineActions';
import {loadMakers} from './actions/makerActions';

import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadWines());
store.dispatch(loadMakers());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
