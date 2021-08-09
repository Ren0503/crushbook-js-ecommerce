import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScrollToTop from 'src/components/ScrollToTop'
import Dashboard from 'src/screens/Dashboard/Dashboard';
import BookList from 'src/screens/Books/BookList';
import BookEdit from 'src/screens/Books/BookEdit';
import UserList from 'src/screens/Users/UserList';
import UserEdit from 'src/screens/Users/UserEdit';
import OrderList from 'src/screens/Orders/OrderList';
import Order from 'src/screens/Orders/Order';
import AuthorList from 'src/screens/Authors/AuthorList';
import AuthorEdit from 'src/screens/Authors/AuthorEdit';
import PostList from 'src/screens/Posts/PostList';
import PostEdit from 'src/screens/Posts/PostEdit';
import Profile from 'src/screens/Setting/Profile';
import NotFound from 'src/screens/Setting/NotFound';

export default function MainRoutes() {
    return (
        <>
            <ScrollToTop>
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/books" component={BookList} exact />
                    <Route path="/books/:id/edit" component={BookEdit} exact />
                    <Route path="/books/:pageNumber" component={BookList} exact />
                    <Route path="/orders" component={OrderList} exact />
                    <Route path="/orders/:id" component={Order} exact />
                    <Route path="/users" component={UserList} exact />
                    <Route path="/users/:id/edit" component={UserEdit} exact />
                    <Route path="/authors" component={AuthorList} exact />
                    <Route path="/authors/:id/edit" component={AuthorEdit} exact />
                    <Route path="/authors/:pageNumber" component={AuthorList} exact />
                    <Route path="/posts" component={PostList} exact />
                    <Route path="/posts/:id/edit" component={PostEdit} exact />
                    <Route path="/posts/:pageNumber" component={PostList} exact />
                    <Route path="/profile" component={Profile} exact />
                </Switch>
            </ScrollToTop>
        </>
    );
};