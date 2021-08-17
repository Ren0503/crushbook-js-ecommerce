import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    BookHomeScreen,
    BookDetailScreen,
} from 'src/screens/Book';
import "src/assets/styles/book.css";

export default function BookRoutes() {
    return (
        <ScrollToTop>
            <Route path='/book/:id' component={BookDetailScreen} />
            <Route path='/books/:pageNumber' component={BookHomeScreen} exact />
            <Route path='/book' component={BookHomeScreen} exact />
        </ScrollToTop>
    )
};