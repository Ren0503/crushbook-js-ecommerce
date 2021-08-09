import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    AuthorList,
    AuthorDetail
} from 'src/screens/Author';

export default function BookRoutes() {
    return (
        <ScrollToTop>
            <Route path='/author' component={AuthorList} exact />
            <Route path='/author/:id' component={AuthorDetail} />
            <Route path='/authors/:pageNumber' component={AuthorList} exact />    
        </ScrollToTop>
    )
};