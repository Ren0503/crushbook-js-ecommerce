import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { detailAuthor, updateAuthor } from 'src/actions/authorActions'
import { AUTHOR_UPDATE_RESET } from 'src/constants/authorConstants'
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

const AuthorEdit = ({ history, match }) => {
    const classes = useStyles();
    const authorId = match.params.id;

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [portrait, setPortrait] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const authorDetail = useSelector(state => state.authorDetail);
    const { loading, error, author } = authorDetail;

    const authorUpdate = useSelector(state => state.authorUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = authorUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: AUTHOR_UPDATE_RESET });
            history.push('/authors');
        } else {
            if (!author.name || author._id !== authorId) {
                dispatch(detailAuthor(authorId));
            } else {
                setName(author.name);
                setAbout(author.about);
                setPortrait(author.portrait);
            }
        }
    }, [        
        dispatch,
        history,
        authorId,
        author,
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

            setPortrait(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateAuthor({
            _id: authorId,
            name,
            about,
            portrait,
        }));
    };

    return (
        <MainLayout>
            <Link to='/authors' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Author
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
                                    id="name"
                                    label="Enter Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="portrait"
                                    label="Enter Image Url"
                                    name="portrait"
                                    value={portrait}
                                    onChange={(e) => setPortrait(e.target.value)}
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
                                    id="about"
                                    label="Enter About"
                                    name="about"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
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

export default AuthorEdit;