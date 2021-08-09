import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Breadcrumb, Jumbotron } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { listAuthors } from 'src/actions/authorActions';
import "src/assets/styles/author.css";

const AuthorListScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const authorList = useSelector(state => state.authorList);
    const { loading, error, authors, page, pages } = authorList;

    useEffect(() => {
        dispatch(listAuthors(keyword, pageNumber));

    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/author" active>
                    Author
                </Breadcrumb.Item>
            </Breadcrumb>
            <Jumbotron className="text-center bg-author-image">
                <Row>
                    <Col className="p-5 text-light">
                        <h1>Famous Literature Authors</h1>
                        <p>Welcome to you with the best bookstore online</p>
                    </Col>
                </Row>
            </Jumbotron>
            <h1 className="mt-2">List Authors</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {authors.map((author) => (
                        <Col key={author._id} sm={12} md={6} lg={4} className="text-center">
                            <div className="p-3">
                                <Image className="author" src={author.portrait} width="200" roundedCircle />

                                <Link to={`/author/${author._id}`}>
                                    <h5 className="title text-center mt-3">
                                        <strong>{author.name}</strong>
                                    </h5>
                                </Link>
                            </div>
                        </Col>
                    ))}
                    <Paginate
                        category="authors"
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </Row>
            )}
        </>
    );
}

export default AuthorListScreen;