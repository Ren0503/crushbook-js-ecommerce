import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';
import { listBooks } from 'src/actions/bookActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const NewBooks = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, page, pages } = bookList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        else {
            dispatch(listBooks(''));
        }
    }, [dispatch, history, userInfo])
    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <List subheader={<ListSubheader>New Books</ListSubheader>}>
                    <Divider variant="inset" component="li" />
                    {
                        books.slice(0, 5).map((book) => (
                            <Link key={book._id} color="inherit" href={`/books/${book._id}/edit`}>
                                <ListItem button alignItems="flex-start">
                                    <ListItemAvatar>
                                        <img alt="User" src={book.image} width="45" />
                                    </ListItemAvatar>
                                    <ListItemText primary={book.name} />
                                </ListItem>
                            </Link>
                        ))
                    }
                    <Link color="inherit" href="/books">
                        <ListItem button>
                            <ListItemText primary="See full books" />
                        </ListItem>
                    </Link>
                </List>
            )}
        </div>
    );
}

export default NewBooks;