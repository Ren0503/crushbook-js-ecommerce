import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Jumbotron, Button, Container } from 'react-bootstrap';
import { Genres, TopAuthors, TopViewPosts, TopRatedBooks, SaleBooks } from 'src/components/home';
import { Meta } from 'src/components/shared';

const HomeScreen = ({ match }) => {
    return (
        <>
            <Meta />
            <Jumbotron className="text-center bg-img-3">
                <Row>
                    <Col className="p-5">
                        <h1>The New Novels in CrushBook</h1>
                        <p>Welcome to you with the best bookstore online</p>
                        <Link>
                            <Button className="btn btn-theme">
                                Go to shop <i className="fas fa-shopping-cart"></i>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <h2 className="text-center p-3">Genres Books</h2>
                <Genres />
            </Container>
            <h2 className="text-center p-3 mt-5">Browser Books</h2>
            <TopRatedBooks />
            <Container>
                <h2 className="text-center p-3 mt-5">Books for sales</h2>
                <SaleBooks />
            </Container>
            <TopAuthors />
            <Container>
                <h2 className="text-center p-3 mt-5">Top Posts</h2>
                <TopViewPosts />
            </Container>
        </>
    );
}

export default HomeScreen;