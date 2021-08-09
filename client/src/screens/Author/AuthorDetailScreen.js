import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Breadcrumb, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Meta, Loader, Message } from 'src/components/shared';
import { detailAuthor } from 'src/actions/authorActions';
import "src/assets/styles/author.css";


const AuthorDetailScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const authorDetail = useSelector(state => state.authorDetail);
    const { loading, error, author } = authorDetail;

    useEffect(() => {
        if (!author._id || author._id !== match.params.id) {
            dispatch(detailAuthor(match.params.id));
        }
    }, [dispatch, match]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <Meta title={author.name} />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/author">
                    Author
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{author.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm={12} md={3}>
                    <Image className="author" src={author.portrait} width="200" roundedCircle />
                </Col>
                <Col sm={12} md={9}>
                    <h3 className="p-2">                    
                        <strong>{author.name}</strong>
                    </h3>
                    <p>{author.about}</p>
                </Col>
            </Row>
            <h4 className="mt-4">Number books ({author.numBooks})</h4>
            <Row>
                {author.books.map((book) => (
                    <Col key={book._id} sm={12} md={6} lg={3}>
                        <Card className='my-3 p-3 rounded'>
                            <Link to={`/book/${book.item}`}>
                                <Card.Img className="book-img" src={book.image} variant='top' />
                            </Link>

                            <Card.Body>
                                <Link to={`/book/${book.item}`}>
                                    <Card.Title as='h5' className="title">
                                        <strong>{book.name}</strong>
                                    </Card.Title>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default AuthorDetailScreen;