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
    listAuthors,
    deleteAuthor,
    createAuthor,
} from 'src/actions/authorActions';
import { AUTHOR_CREATE_RESET } from 'src/constants/authorConstants';
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

const AuthorList = ({ history, match }) => {
    const classes = useStyles();
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const authorList = useSelector(state => state.authorList);
    const { loading, error, authors, page, pages, count } = authorList;

    const authorDelete = useSelector(state => state.authorDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = authorDelete;

    const authorCreate = useSelector(state => state.authorCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        author: createdAuthor,
    } = authorCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: AUTHOR_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        if (successCreate) {
            history.push(`/authors/${createdAuthor._id}/edit`);
        } else {
            dispatch(listAuthors('', pageNumber));
        }
    }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        successDelete,
        createdAuthor,
        pageNumber,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteAuthor(id));
        }
    }

    const createAuthorHandler = () => {
        dispatch(createAuthor());
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                AUTHOR LIST ({count})
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
                                            <TableCell>ABOUT</TableCell>
                                            <TableCell>EDIT</TableCell>
                                            <TableCell>DELETE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {authors.map((author, index) => (
                                            <TableRow key={author._id}>
                                                <TableCell>{index + 1 + Number(pageNumber-1)*12}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={author.portrait}
                                                        alt="Paella dish"
                                                        width="80"
                                                    />
                                                </TableCell>
                                                <TableCell>{author.name}</TableCell>
                                                <TableCell>{author.about}</TableCell>
                                                <TableCell>
                                                    <Link href={`/authors/${author._id}/edit`} onClick={(e) => e.preventDefault}>
                                                        <Button variant="contained" color="secondary" href="">
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={() => deleteHandler(author._id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Paginate category='authors' pages={pages} page={page} />
                            </>
                        )}
                        <div className={classes.createdButton}>
                            <Button color="primary" href="#" onClick={createAuthorHandler}>
                                <AddCircleIcon fontSize="large"/>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default AuthorList;