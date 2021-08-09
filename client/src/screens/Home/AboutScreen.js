import React from 'react';
import Lottie from 'lottie-react-web';
import { Meta } from 'src/components/shared';
import { Container, Jumbotron, Breadcrumb, Row, Col, Image, CardDeck, Card } from 'react-bootstrap';
import about1 from 'src/assets/images/about1.jpg';
import about2 from 'src/assets/images/about2.jpg';
import client1 from 'src/assets/images/client1.jpg';
import client2 from 'src/assets/images/client2.jpg';
import client3 from 'src/assets/images/client3.jpg';
import home from 'src/assets/animations/homeAnimation.json';
import about from 'src/assets/animations/aboutAnimation.json';

const AboutScreen = () => {
    return (
        <Container>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>About</Breadcrumb.Item>
            </Breadcrumb>
            <Jumbotron className="text-center bg-about-image">
                <Row>
                    <Col className="p-5 text-light" md={6}>
                        <h1>About Us</h1>
                        <p>Founded in the belief that change comes from being in deeper connection with a robust and diverse network of humans, we share stories of individuals that reveal how interconnected we truly are.</p>
                    </Col>
                </Row>
            </Jumbotron>
            <Row className="mt-5 p-3">
                <Col md={8}>
                    <div className="p-3">
                        <h3><strong>Who We Are</strong></h3>
                        <i>Team of book-loving professionals</i>
                        <p>Our dedicated team of publishing professionals is committed to helping authors realize their very best work and to finding innovative new ways of bringing stories and ideas to audiences worldwide.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <Image className="post-img" src={about1} fluid />
                </Col>
            </Row>
            <hr />
            <Row className="mt-5 p-3">
                <Col md={4}>
                    <Image className="post-img" src={about2} fluid />
                </Col>
                <Col md={8}>
                    <div className="text-right p-3">
                        <h3><strong>What We Do</strong></h3>
                        <i>Finding new ways of bringing stories</i>
                        <p>We scan new media landscape and spot budding authors – indeed, many have done so and have already brought new talent to the market with number one bestsellers.</p>
                    </div>
                </Col>
            </Row>
            <h1 className="mt-5 text-center"><strong>Our Client Says</strong></h1>
            <p className="text-center">Testimonials</p>
            <CardDeck>
                <Card className="p-3">
                    <Card.Body className="border">
                        <Card.Text as="i">
                            "People think focus means saying yes to the thing you’ve got to focus on. But that’s not what it means"
                        </Card.Text>
                        <Row className="mt-3">
                            <Col md={3}><Image src={client1} width="50" height="50" roundedCircle /></Col>
                            <Col md={9}>
                                <strong>John Smith</strong>
                                <p>Writer</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="p-3">
                    <Card.Body className="border">
                        <Card.Text as="i">
                            "If we encounter a man of rare intellect, we should ask him what books he reads."
                        </Card.Text>
                        <Row className="mt-3">
                            <Col md={3}><Image src={client2} width="50" height="50" roundedCircle /></Col>
                            <Col md={9}>
                                <strong>David Brackhan</strong>
                                <p>Writer</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="p-3">
                    <Card.Body className="border">
                        <Card.Text as="i">
                            "There are many little ways to enlarge your child’s world. Love of books is the best of all."
                        </Card.Text>
                        <Row className="mt-3">
                            <Col md={3}><Image src={client3} width="50" height="50" roundedCircle /></Col>
                            <Col md={9}>
                                <strong>Amy Adams</strong>
                                <p>Writer</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </CardDeck>
            <Row>
                <Col md={6}>
                    <Lottie
                        options={{ animationData: home }}
                        height={300}
                    />
                </Col>
                <Col md={6}>
                    <Lottie
                        options={{ animationData: about }}
                        height={300}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default AboutScreen;