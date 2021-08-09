import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from 'src/assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-dark text-light">
            <Container className="py-1" variant="dark">
                <Row className="py-4">
                    <Col lg={4} md={6} >
                        <img src={logo} alt="logo" width={180} className="mb-3 avatar" variant="dark" />
                        <p className="font-italic text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                        <ul className="list-inline mt-4">
                            <li className="list-inline-item"><a href="#" target="_blank" title="twitter"><i className="fa fa-twitter" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="facebook"><i className="fa fa-facebook" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="instagram"><i className="fa fa-instagram" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="pinterest"><i className="fa fa-pinterest" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="vimeo"><i className="fa fa-vimeo" /></a></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6 className="text-uppercase font-weight-bold mb-4 text-light">Genres</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-light">Novel</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Sci Fic</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Graphic</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Poetry</a></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6 className="text-uppercase font-weight-bold mb-4 text-light">Company</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-light">Login</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Register</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Wishlist</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Our Books</a></li>
                        </ul>
                    </Col>
                    <Col lg={4} md={6}>
                        <h6 className="text-uppercase font-weight-bold mb-4 text-light">Newsletter</h6>
                        <p className="text-light mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
                        <div className="p-1 rounded border">
                            <div className="input-group">
                                <input type="email" placeholder="Enter your email address" aria-describedby="button-addon1" className="form-control border-0 shadow-0" />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-light"><i className="fa fa-paper-plane" /></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
