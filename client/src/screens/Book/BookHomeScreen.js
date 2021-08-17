import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Dropdown } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { Book } from 'src/components/book';
import { listBooks } from 'src/actions/bookActions';
import { TopRatedBooks } from 'src/components/home';
import SearchBox from 'src/components/core/Search';
import Filter from 'src/components/core/Filter';

const BookHomeScreen = ({ match }) => {
    const pageNumber = match.params.pageNumber || 1;
    const sort = match.params.sort;

    const dispatch = useDispatch();
    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, page, pages, count } = bookList;

    useEffect(() => {
        dispatch(listBooks(pageNumber, sort));
    }, [dispatch, pageNumber, sort]);

    return (
        <>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/book" active>
                    Book
                </Breadcrumb.Item>
            </Breadcrumb>

            <TopRatedBooks />
            <Route render={({ history }) => <Filter history={history} />} />
            <h1 className="mt-2 text-center">Latest Book</h1>
            <div>
                <Dropdown className="text-left">
                    <Dropdown.Toggle className="btn-theme" id="dropdown-basic">
                        Select Sort
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/book">Sort by latest</Dropdown.Item>
                        <Dropdown.Item href="/sort/-sales">Sort by sales</Dropdown.Item>
                        <Dropdown.Item href="/sort/name">Sort by A-Z</Dropdown.Item>
                        <Dropdown.Item href="/sort/-rating">Sort by rating</Dropdown.Item>
                        <Dropdown.Item href="/sort/price">Sort by price : low to high </Dropdown.Item>
                        <Dropdown.Item href="/sort/-price">Sort by price : high to low </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h6 className="align-right text-right">Showing {1 + Number(pageNumber - 1) * 12} - {pageNumber * 12} of {count} result</h6>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {books.map((book) => (
                            <Col key={book._id} sm={12} md={6} lg={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        category="books"
                        pages={pages}
                        page={page}
                        sort={sort}
                    />
                </>
            )}
        </>
    );
}

export default BookHomeScreen;