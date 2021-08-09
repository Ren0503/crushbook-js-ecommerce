import React from 'react';
import { Route } from 'react-router-dom';
import { ScrollToTop } from 'src/components/shared';
import {
    PostList,
    PostDetail,
} from 'src/screens/Post';

export default function BookRoutes() {
    return (
        <ScrollToTop>
            <Route path='/post' component={PostList} exact />
            <Route path='/post/:id' component={PostDetail} />
        </ScrollToTop>
    )
};