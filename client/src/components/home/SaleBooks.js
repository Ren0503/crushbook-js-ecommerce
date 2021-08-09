import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listSaleBook } from 'src/actions/bookActions';
import "src/assets/styles/sales.css";

const SaleBooks = () => {
    const dispatch = useDispatch();

    const bookSale = useSelector(state => state.bookSale);
    const { loading, error, books } = bookSale;

    useEffect(() => {
        dispatch(listSaleBook());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <ul className="align">
            {books.map((book) => (
                <li className="mt-0" key={book._id}>
                    <figure className="sales_book">
                        <ul className="hardcover_front">
                            <li>
                                <img src={book.image} alt="Images" width="100%" height="100%" />
                            </li>
                            <li />
                        </ul>
                        {/* Pages */}
                        <ul className="page">
                            <li />
                            <li>
                                <a className="btn-sale" href="#">See more</a>
                            </li>
                            <li />
                            <li />
                            <li />
                        </ul>
                        {/* Back */}
                        <ul className="hardcover_back">
                            <li />
                            <li />
                        </ul>
                        <ul className="book_spine">
                            <li />
                            <li />
                        </ul>
                        <figcaption>
                            <Link to={`/book/${book._id}`}>
                                <h4 className="title"><strong>{book.name}</strong></h4>
                            </Link>
                            <span>By {book.author}</span>
                            {book.sales > 0 ? (
                                <>
                                    <strike>
                                        ${book.price}
                                    </strike>

                                    <h4 className="mt-1"><strong>${book.sales}</strong></h4>
                                </>
                            ) : (
                                <h4><strong>${book.price}</strong></h4>
                            )}
                        </figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    );
}

export default SaleBooks;