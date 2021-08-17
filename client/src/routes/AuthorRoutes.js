import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    AuthorListScreen,
    AuthorDetailScreen
} from 'src/screens/Author';

export default function BookRoutes() {
    return (
        <ScrollToTop>
            <Route path='/author' component={AuthorListScreen} exact />
            <Route path='/author/:id' component={AuthorDetailScreen} />
            <Route path='/authors/:pageNumber' component={AuthorListScreen} exact />    
        </ScrollToTop>
    )
};