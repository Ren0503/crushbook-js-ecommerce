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
import Avatar from '@material-ui/core/Avatar';
import { listUsers } from 'src/actions/userActions'
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';

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

const NewUsers = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])
    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <List subheader={<ListSubheader>New Users</ListSubheader>}>
                    <Divider variant="inset" component="li" />
                    {
                        users.slice(0, 5).map((user) => (
                            <Link key={user._id} color="inherit" href={`/users/${user._id}/edit`}>
                                <ListItem button alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="User" src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                </ListItem>
                            </Link>
                        ))
                    }
                    <Link color="inherit" href="/users">
                        <ListItem button>
                            <ListItemText primary="See full users" />
                        </ListItem>
                    </Link>
                </List>
            )}
        </div>
    );
}

export default NewUsers;