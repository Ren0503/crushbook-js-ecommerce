import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { listOrders } from 'src/actions/orderActions'
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

const NewOrders = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    useEffect(() => {
            dispatch(listOrders());
    }, [dispatch]);
    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <List subheader={<ListSubheader>New Orders</ListSubheader>}>
                    <Divider variant="inset" component="li" />
                    {
                        orders.slice(0, 3).map((order) => (
                            <Link key={order._id} color="inherit" href={`/orders/${order._id}`}>
                                <ListItem button alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="User" src={order.user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={order.createdAt.substring(0, 10)} secondary={`by ${order.user.name}`} />
                                    <ListItemSecondaryAction>
                                        <Typography>
                                            ${order.totalPrice}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Link>
                        ))
                    }
                    <Link color="inherit" href="/orders">
                        <ListItem button>
                            <ListItemText primary="See full orders" />
                        </ListItem>
                    </Link>
                </List>
            )}
        </div>
    );
}

export default NewOrders;