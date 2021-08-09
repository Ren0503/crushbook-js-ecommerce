import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Image, Button, Container, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listTopBooks } from 'src/actions/bookActions';
import { Rating } from 'src/components/book';

const TopRatedBooks = () => {
    const dispatch = useDispatch();

    const bookTopRated = useSelector(state => state.bookTopRated);
    const { loading, error, books } = bookTopRated;

    useEffect(() => {
        dispatch(listTopBooks());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className='bg-img-2 p-5'>
            <Container>
                <Carousel>
                    {books.map((book) => (
                        <Carousel.Item key={book._id}>
                            <Row>
                                <Col sm={12} md={6} lg={3}>
                                    <Link key={book._id} to={`/book/${book._id}`}>
                                        <Image src={book.image} alt={book.name} fluid />
                                    </Link>
                                </Col>
                                <Col sm={12} md={6} lg={9}>
                                    <h3 className="p-1">{book.name}</h3>
                                    <Rating
                                        value={book.rating}
                                        text={`${book.numReviews} reviews`}
                                    />
                                    {book.sales > 0 ? (
                                        <>
                                            <strike>
                                                ${book.price}
                                            </strike>

                                            <h2><strong>${book.sales}</strong></h2>
                                        </>
                                    ) : (
                                        <h2><strong>${book.price}</strong></h2>
                                    )}
                                    <p>{book.description}</p>

                                    <Link>
                                        <Button className="btn btn-theme">
                                            See more <i className="fas fa-shopping-cart"></i>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </div>
    );
}

export default TopRatedBooks;
