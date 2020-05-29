import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movies from './containers/Movies';
import Wishlist from './containers/Wishlist';
import NotFoundPage from './containers/NotFoundPage';

const Index = () => (
    <Route render={({ location }) => (
        <Switch location={location}>
            <Route path="/" component={Movies} key="Movies" exact={true} />
            <Route path="/wishlist" component={Wishlist} key="Wishlist" exact={true} />
            <Route path="" component={NotFoundPage} />
        </Switch>

    )} />
);

export default Index;