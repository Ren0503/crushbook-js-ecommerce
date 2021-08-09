import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    BookHome,
    BookDetail,
} from 'src/screens/Book';
import "src/assets/styles/book.css";

export default function BookRoutes() {
    return (
        <ScrollToTop>
            <Route path='/book/:id' component={BookDetail} />
            <Route path='/books/:pageNumber' component={BookHome} exact />
            <Route path='/sort/:sort' component={BookHome} exact />
            <Route
                path='/sort/:sort/books/:pageNumber'
                component={BookHome}
                exact
            />
            <Route path='/book' component={BookHome} exact />
        </ScrollToTop>
    )
};