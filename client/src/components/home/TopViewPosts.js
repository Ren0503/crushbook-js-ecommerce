import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listTopPosts } from 'src/actions/postActions';
import moment from 'moment';

const TopViewPosts = () => {
    const dispatch = useDispatch();

    const postTopView = useSelector(state => state.postTopView);
    const { loading, error, posts } = postTopView;

    useEffect(() => {
        dispatch(listTopPosts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Row>
            {posts.map((post) => (
                <Col sm={12} md={6} key={post._id}>
                    <Card className="post-card border my-1 p-3">
                        <Row>
                            <Col className='p-3' sm={4}>
                                <Image className="post-card-img" src={post.image} fluid />
                            </Col>
                            <Col className='p-3' sm={8}>
                                <h6 className="title">{post.title}</h6>
                                <p><i>{moment(post.createdAt).format('MMMM DD YYYY')}</i></p>

                                <Link to={`/post/${post._id}`}>
                                    <Button className="btn btn-theme">
                                        See more
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default TopViewPosts;