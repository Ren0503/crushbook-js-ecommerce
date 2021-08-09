import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    LoginScreen,
    ProfileScreen,
    RegisterScreen,
} from 'src/screens/Auth';

export default function AuthRoutes() {
    return (
        <ScrollToTop>
            <Route path='/login' component={LoginScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/register' component={RegisterScreen} />
        </ScrollToTop>
    );
};