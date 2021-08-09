import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Image, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listTopAuthors } from 'src/actions/authorActions';

const TopAuthors = () => {
    const dispatch = useDispatch();

    const authorTop = useSelector(state => state.authorTop);
    const { loading, error, authors } = authorTop;

    useEffect(() => {
        dispatch(listTopAuthors());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger' >{error}</Message>
    ) : (
        <Jumbotron className="bg-top-author">
            <h2 className="text-center p-3 text-light">Top Authors</h2>
            <Container>
                <Row>
                    {authors.map((author) => (
                        <Col sm={12} md={6} lg={3}>
                            <blockquote className="blockquote mb-0 text-center card-body" key={author._id}>
                                <div className="author-top">
                                    <Image src={author.portrait} fluid className="author-img border" />
                                    <div className="overlay">
                                        <Link to={`/author/${author._id}`}>
                                            <div className="author-text">
                                                <h4>
                                                    {author.name}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </blockquote>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default TopAuthors;