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
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';
import Paginate from 'src/components/Paginate'
import {
    listBooks,
    deleteBook,
    createBook,
} from 'src/actions/bookActions';
import { BOOK_CREATE_RESET } from 'src/constants/bookConstants';
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

const BookList = ({ history, match }) => {
    const classes = useStyles();
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, page, pages, count } = bookList;

    const bookDelete = useSelector(state => state.bookDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = bookDelete;

    const bookCreate = useSelector(state => state.bookCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        book: createdBook,
    } = bookCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: BOOK_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/books/${createdBook._id}/edit`)
        } else {
            dispatch(listBooks(pageNumber))
        }
    }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        successDelete,
        createdBook,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteBook(id))
        }
    }

    const createBookHandler = () => {
        dispatch(createBook())
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                BOOK LIST ({count})
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
                                            <TableCell>NAME</TableCell>
                                            <TableCell>PRICE</TableCell>
                                            <TableCell>AUTHOR</TableCell>
                                            <TableCell>DATE</TableCell>
                                            <TableCell>ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {books.map((book, index) => (
                                            <TableRow key={book._id}>
                                                <TableCell>{index + 1 + Number(pageNumber-1)*12}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={book.image}
                                                        alt="Paella dish"
                                                        width="80"
                                                    />
                                                </TableCell>
                                                <TableCell>{book.name}</TableCell>
                                                <TableCell>$ {book.price}</TableCell>
                                                <TableCell>{book.author}</TableCell>
                                                <TableCell>{book.publishedAt}</TableCell>
                                                <TableCell>
                                                    <Link href={`/books/${book._id}/edit`} onClick={(e) => e.preventDefault}>
                                                        <Button variant="contained" color="secondary" href="">
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="contained" color="primary" onClick={() => deleteHandler(book._id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Paginate category='books' pages={pages} page={page} />
                            </>
                        )}
                        <div className={classes.createdButton}>
                            <Button color="primary" href="#" onClick={createBookHandler}>
                                <AddCircleIcon fontSize="large"/>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default BookList;