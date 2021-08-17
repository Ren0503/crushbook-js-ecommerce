import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    HomeScreen,
    AboutScreen,
    ContactScreen,
    CartScreen,
    SearchScreen
} from 'src/screens/Home';

export default function HomeRoutes() {
    return (
        <ScrollToTop>
            <Route path='/about' component={AboutScreen} />
            <Route path='/contact' component={ContactScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/' component={HomeScreen} exact />
            <Route path='/search' component={SearchScreen} exact />
            <Route path='/search/:pageNumber' component={SearchScreen} exact />
        </ScrollToTop>
    )
};