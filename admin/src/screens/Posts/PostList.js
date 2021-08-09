import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Paginate from 'src/components/Paginate';
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';
import {
    listPosts,
    deletePost,
    createPost,
} from 'src/actions/postActions';
import { POST_CREATE_RESET } from 'src/constants/postConstants';
import Typography from '@material-ui/core/Typography';
import MainLayout from 'src/layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
    createdButton: {
        marginTop: theme.spacing(3),
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const PostList = ({ history, match }) => {
    const classes = useStyles();
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const postList = useSelector(state => state.postList);
    const { loading, error, posts, page, pages, count } = postList;

    const postDelete = useSelector(state => state.postDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = postDelete;

    const postCreate = useSelector(state => state.postCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        post: createdPost,
    } = postCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: POST_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        if (successCreate) {
            history.push(`/posts/${createdPost._id}/edit`);
        } else {
            dispatch(listPosts('', pageNumber));
        }
    }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        successDelete,
        createdPost,
        pageNumber,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deletePost(id));
        }
    };

    const createPostHandler = () => {
        dispatch(createPost());
    };

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                POSTS LIST ({count})
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {loadingDelete && <Loader />}
                        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                        {loadingCreate && <Loader />}
                        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>IMAGE</TableCell>
                                            <TableCell>TITLE</TableCell>
                                            <TableCell>DESCRIPTION</TableCell>
                                            <TableCell>EDIT</TableCell>
                                            <TableCell>DELETE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {posts.map((post, index) => (
                                            <TableRow key={post._id}>
                                                <TableCell>{index + 1 + Number(pageNumber-1)*12}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={post.image}
                                                        alt="Paella dish"
                                                        width="80"
                                                    />
                                                </TableCell>
                                                <TableCell>{post.title}</TableCell>
                                                <TableCell>{post.description}</TableCell>
                                                <TableCell>
                                                    <Link href={`/posts/${post._id}/edit`} onClick={(e) => e.preventDefault}>
                                                        <Button variant="contained" color="secondary" href="">
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={() => deleteHandler(post._id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Paginate category='post' pages={pages} page={page} />
                            </>
                        )}
                        <div className={classes.createdButton}>
                            <Button color="primary" href="#" onClick={createPostHandler}>
                                <AddCircleIcon fontSize="large" />
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default PostList;