import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Jumbotron, Badge, Image } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { listPosts } from 'src/actions/postActions';
import "src/assets/styles/post.css";

const PostListScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const postList = useSelector(state => state.postList);
    const { loading, error, posts, page, pages } = postList;

    useEffect(() => {
        dispatch(listPosts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active href="/post">
                    Post
                </Breadcrumb.Item>
            </Breadcrumb>
            <Jumbotron className="text-center bg-post-image">
                <Row>
                    <Col className="p-5 text-light">
                        <h1>The Time To Read About The World</h1>
                        <p>Welcome to you with the best bookstore online</p>
                    </Col>
                </Row>
            </Jumbotron>
            <h1 className="mt-2">Latest Posts</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {posts.map((post) => (
                        <Row className='post my-5' key={post._id}>
                            <Col md={4}>
                                <Image className="post-img" src={post.image} width={300} />
                            </Col>
                            <Col md={8}>
                                <Link to={`/post/${post._id}`}>
                                    <h4 className="title pt-2"><strong>{post.title}</strong></h4>
                                </Link>
                                <Badge className="btn-theme">{post.category}</Badge>
                                <p>{post.description}</p>
                            </Col>
                        </Row>
                    ))}
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
}

export default PostListScreen;