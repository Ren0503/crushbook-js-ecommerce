import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Trix from 'trix';
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from 'react-trix-rte';
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';
import { detailPosts, updatePost } from 'src/actions/postActions'
import { POST_UPDATE_RESET } from 'src/constants/postConstants'
import MainLayout from 'src/layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
    },
}));

const PostEdit = ({ history, match }) => {
    const classes = useStyles();
    const postId = match.params.id;

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const postDetail = useSelector(state => state.postDetail);
    const { loading, error, post } = postDetail;

    const postUpdate = useSelector(state => state.postUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = postUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: POST_UPDATE_RESET });
            history.push('/posts');
        } else {
            if (!post.title || post._id !== postId) {
                dispatch(detailPosts(postId));
            } else {
                setTitle(post.title);
                setImage(post.image);
                setCategory(post.category);
                setDescription(post.description);
                setBody(post.body);
            }
        }
    }, [
        dispatch,
        history,
        postId,
        post,
        successUpdate
    ]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post(`/api/upload`, formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updatePost({
            _id: postId,
            title,
            image,
            category,
            description,
            body,
        }));
    };

    function handleChange(event, newValue) {
        setBody(newValue); // OR custom on change listener.
    }

    return (
        <MainLayout>
            <Link to='/posts' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Posts
                </Typography>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Enter Title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="image"
                                    label="Enter Image Url"
                                    name="image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="icon-button-file"
                                    type="file"
                                    onChange={uploadFileHandler}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {uploading && <Loader />}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="category"
                                    label="Enter category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Enter description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ReactTrixRTEToolbar toolbarId="react-trix-rte-editor" />
                                <ReactTrixRTEInput
                                    defaultValue={post.body}
                                    toolbarId="react-trix-rte-editor"
                                    onChange={handleChange} 
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </div>
        </MainLayout>
    );
};

export default PostEdit;