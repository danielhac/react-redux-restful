import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import WinesPage from './components/wine/WinesPage';
import ManageWinePage from './components/wine/ManageWinePage';

import MakersPage from './components/maker/MakersPage';
import ManageMakerPage from './components/maker/ManageMakerPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="wines" component={WinesPage} />
        <Route path="wine" component={ManageWinePage} />
        <Route path="wine/:id" component={ManageWinePage} />

        <Route path="makers" component={MakersPage} />
        <Route path="maker" component={ManageMakerPage} />
        <Route path="maker/:id" component={ManageMakerPage} />
        <Route path="about" component={AboutPage} />
    </Route>
);
