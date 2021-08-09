import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header, Footer } from 'src/components/core';
import { Container } from 'react-bootstrap'

import HomeRoutes from 'src/routes/HomeRoutes';
import AuthRoutes from 'src/routes/AuthRoutes';
import OrderRoutes from 'src/routes/OrderRoutes';
import BookRoutes from 'src/routes/BookRoutes';
import PostRoutes from 'src/routes/PostRoutes';
import AuthorRoutes from 'src/routes/AuthorRoutes';

import image from 'src/assets/images/scrollToTop.png';
import 'src/assets/styles/layout.css';
import 'src/assets/styles/modules.css';

const App = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <Router>
            <Header />
            <main className="py-3">
                <HomeRoutes />
                <Container >
                    <AuthRoutes />
                    <OrderRoutes />
                    <BookRoutes />
                    <PostRoutes />
                    <AuthorRoutes />
                </Container>
            </main>
            <div className="scroll-to-top">
                {visible &&
                    <div onClick={scrollToTop}>
                        <img src={image} alt='Go to top' width="50" />
                    </div>
                }
            </div>
            <Footer />
        </Router>
    );
};

export default App;
