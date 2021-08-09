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
import { listPosts } from 'src/actions/postActions';

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

const NewPosts = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const postList = useSelector(state => state.postList);
    const { loading, error, posts, page, pages } = postList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        else {
            dispatch(listPosts('', ''));
        }
    }, [dispatch, history, userInfo])
    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <List subheader={<ListSubheader>New Posts</ListSubheader>}>
                    <Divider variant="inset" component="li" />
                    {
                        posts.slice(0, 3).map((post) => (
                            <Link key={post._id} color="inherit" href={`/posts/${post._id}/edit`}>
                                <ListItem button alignItems="flex-start">
                                    <ListItemAvatar>
                                        <img alt="Posts" src={post.image} width="40" />
                                    </ListItemAvatar>
                                    <ListItemText primary={post.title} />
                                </ListItem>
                            </Link>
                        ))
                    }
                    <Link color="inherit" href="/posts">
                        <ListItem button>
                            <ListItemText primary="See full posts" />
                        </ListItem>
                    </Link>
                </List>
            )}
        </div>
    );
}

export default NewPosts;