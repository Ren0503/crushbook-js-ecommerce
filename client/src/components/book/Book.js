import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';
import "src/assets/styles/book.css";

const Book = ({ book }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Img className="book-img" src={book.image} variant='top' height="350" />

            <Card.Body>
                <Link to={`/book/${book._id}`}>
                    <Card.Title as='h5' className="title">
                        <strong>{book.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <p>by {book.author}</p>
                </Card.Text>

                {book.sales > 0 ? (
                    <>
                        <Card.Text as='strike'>
                            ${book.price}
                        </Card.Text>

                        <Card.Text className="mt-1" as='h4'><strong>${book.sales}</strong></Card.Text>
                    </>
                ) : (
                    <Card.Text as='h4'><strong>${book.price}</strong></Card.Text>
                )}

                {book.rating > 0 && <Rating value={book.rating} />}
            </Card.Body>

            <Link to={`/cart/${book._id}`}>
                <Button className="btn btn-theme"><i className="fas fa-shopping-cart"></i> Add to Cart</Button>
            </Link>
        </Card>
    );
}

export default React.memo(Book);