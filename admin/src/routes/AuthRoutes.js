import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScrollToTop from 'src/components/ScrollToTop'
import Login from 'src/screens/Auth/Login';
import Register from 'src/screens/Auth/Register';

export default function AuthRoutes() {
    return (
        <ScrollToTop>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </Switch>
        </ScrollToTop>
    );
};