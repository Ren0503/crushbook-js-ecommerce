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
import { detailBook, updateBook } from 'src/actions/bookActions'
import { BOOK_UPDATE_RESET } from 'src/constants/bookConstants'
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

const BookEdit = ({ history, match}) => {
    const classes = useStyles();
    const bookId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [genres, setGenres] = useState('');
    const [language, setLanguage] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState(0);
    const [sales, setSales] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const bookDetail = useSelector(state => state.bookDetail);
    const { loading, error, book } = bookDetail;

    const bookUpdate = useSelector(state => state.bookUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = bookUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BOOK_UPDATE_RESET })
            history.push('/books');
        } else {
            if (!book.name || book._id !== bookId) {
                dispatch(detailBook(bookId));
            } else {
                setName(book.name);
                setPrice(book.price);
                setImage(book.image);
                setAuthor(book.author);
                setGenres(book.genres);
                setLanguage(book.language);
                setPages(book.pages);
                setSales(book.sales);
                setPublishedAt(book.publishedAt);
                setPublisher(book.publisher);
                setCountInStock(book.countInStock);
                setDescription(book.description)
            }
        }
    }, [
        dispatch,
        history,
        bookId,
        book,
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

        dispatch(updateBook({
            _id: bookId,
            name,
            price,
            image,
            author,
            pages,
            sales,
            genres,
            language,
            publishedAt,
            publisher,
            countInStock,
            description,
        }));
    };

    return (
        <MainLayout>
            <Link to='/books' className='btn btn-light my-3'>
                Go Back
            </Link>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit book
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
                                    id="price"
                                    label="Enter Price"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="sales"
                                    label="Enter Sales Books"
                                    name="sales"
                                    value={sales}
                                    onChange={(e) => setSales(e.target.value)}
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
                                    id="author"
                                    label="Enter Author"
                                    name="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="language"
                                    label="Enter Language"
                                    name="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="pages"
                                    label="Enter Pages"
                                    name="pages"
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="genres"
                                    label="Enter Genres"
                                    name="genres"
                                    value={genres}
                                    onChange={(e) => setGenres(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="publishedAt"
                                    label="Enter Published At"
                                    name="publishedAt"
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="publisher"
                                    label="Enter Publisher"
                                    name="publisher"
                                    value={publisher}
                                    onChange={(e) => setPublisher(e.target.value)}
                                />
                            </Grid>    
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="countInStock"
                                    label="Enter Count In Stock"
                                    name="countInStock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </Grid>     
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="description"
                                    label="Enter Description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
}

export default BookEdit;