import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    PostListScreen,
    PostDetailScreen,
} from 'src/screens/Post';

export default function BookRoutes() {
    return (
        <ScrollToTop>
            <Route path='/post' component={PostListScreen} exact />
            <Route path='/post/:id' component={PostDetailScreen} />
        </ScrollToTop>
    )
};