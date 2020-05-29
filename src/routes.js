import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchMovie from './containers/SearchMovie';
import NotFoundPage from './containers/NotFoundPage';

const Index = () => (
    <Route render={({ location }) => (
        <Switch location={location}>
            <Route path="/" component={SearchMovie} key="SearchMovie" exact={true} />
            <Route path="" component={NotFoundPage} />
        </Switch>
    )} />
);

export default Index;