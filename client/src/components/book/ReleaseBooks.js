import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Figure } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listReleasesBooks } from 'src/actions/bookActions';
import Book from './Book';

const settings = {
    className: "center",
    centerMode: false,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 500,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const ReleaseBooks = () => {
    const dispatch = useDispatch();

    const bookNewReleases = useSelector(state => state.bookNewReleases);
    const { loading, error, books } = bookNewReleases;

    useEffect(() => {
        dispatch(listReleasesBooks());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Slider {...settings}>
            {books.map((book) => (
                <Figure key={book._id}>
                    <Book book={book} />
                </Figure>
            ))}
        </Slider>
    );
}

export default ReleaseBooks;