import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Breadcrumb } from 'react-bootstrap';
import { Loader, Message, Meta } from 'src/components/shared';
import {
    detailPosts,
    createPostComment,
} from 'src/actions/postActions';
import { POST_CREATE_COMMENT_RESET } from 'src/constants/postConstants';

const PostDetailScreen = ({ history, match }) => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const postDetail = useSelector(state => state.postDetail);
    const { loading, error, post } = postDetail;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const postCommentCreate = useSelector(state => state.postCommentCreate);
    const {
        success: successPostComment,
        loading: loadingPostComment,
        error: errorPostComment,
    } = postCommentCreate;

    useEffect(() => {
        if (successPostComment) {
            setContent('');
        }
        if (!post._id || post._id !== match.params.id) {
            dispatch(detailPosts(match.params.id));
            dispatch({ type: POST_CREATE_COMMENT_RESET });
        }
    }, [dispatch, match, successPostComment]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createPostComment(match.params.id, { content })
        );
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/post'>
                <i className="fas fa-angle-left"></i> Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={post.title} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/post">
                            Post
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className="text-center p-3">{post.title}</h3>
                    <div className="paper text-justify">
                        <i>{post.description}</i>
                        <Row className="p-3">
                            <Col className="m-auto" md={6}>
                                <Image src={post.image} alt="Card image" fluid />
                            </Col>
                        </Row>
                        <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>
                    <div className="mt-5">
                        {post.comments.length === 0 &&
                            <Message>
                                No comments
                            </Message>
                        }
                        <ListGroup variant='flush'>
                            {post.comments.map((comment) => (
                                <ListGroup.Item key={comment._id}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={comment.avatar} width="50" height="50" roundedCircle />
                                        </Col>
                                        <Col md={11}>
                                            <strong>{comment.name}</strong>
                                            <p>{comment.createdAt.substring(0, 10)}</p>
                                            <p>{comment.content}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div>
                        <ListGroup>
                            <h2>Write a Customer Comment</h2>
                            {successPostComment && (
                                <Message variant="success">
                                    Comment submitted successfully
                                </Message>
                            )}
                            {loadingPostComment && <Loader />}
                            {errorPostComment && (
                                <Message variant='danger'>{errorPostComment}</Message>
                            )}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='content'>
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            row='3'
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        disabled={loadingPostComment}
                                        type='submit'
                                        variant='primary'
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please<Link to='/login'>sign in</Link> to write a review{' '}
                                </Message>
                            )}
                        </ListGroup>
                    </div>
                </>
            )}
        </>
    )
}

export default PostDetailScreen;