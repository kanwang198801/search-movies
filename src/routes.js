import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movies from './containers/Movies';
import NotFoundPage from './containers/NotFoundPage';

const Index = () => (
    <Route render={({ location }) => (
        <Switch location={location}>
            <Route path="/" component={Movies} key="Movies" exact={true} />
            <Route path="" component={NotFoundPage} />
        </Switch>
    )} />
);

export default Index;