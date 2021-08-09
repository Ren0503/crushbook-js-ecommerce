import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CropFreeIcon from '@material-ui/icons/CropFree';
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import {
    getOrderDetail,
    payOrder,
    deliverOrder,
} from 'src/actions/orderActions'
import * as types from 'src/constants/orderConstants'
import Loader from 'src/components/Loader';
import Message from 'src/components/Message';
import MainLayout from 'src/layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeightPaper: {
        height: 400,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const Order = ({ match, history }) => {
    const classes = useStyles();
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetail = useSelector((state) => state.orderDetail)
    const { order, loading, error } = orderDetail

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(`/api/config/paypal`)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }


        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: types.ORDER_PAY_RESET })
            dispatch({ type: types.ORDER_DELIVER_RESET })
            dispatch(getOrderDetail(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <MainLayout>
            <Typography component="h1" variant="h5">
                Order {order._id}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <List className={classes.root}>
                            <Typography component="h3" variant="h5">
                                Shipping
                            </Typography>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt="User" src={order.user.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={order.user.name} secondary={order.user.email} />
                            </ListItem>
                            <ListItem button onClick={handleClick}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Address" secondary={order.shippingAddress.address} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <LocationCityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={order.shippingAddress.city} />
                                    </ListItem>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <CropFreeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={order.shippingAddress.postalCode} />
                                    </ListItem>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <PublicIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={order.shippingAddress.country} />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem>
                                {order.isDelivered ? (
                                    <Message variant='success'>
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>  
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <List className={classes.root}>
                            <Typography component="h3" variant="h5">
                                Payment Method
                            </Typography>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PaymentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={order.paymentMethod} />
                            </ListItem>
                            <ListItem>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>  
                    <Paper className={classes.fixedHeightPaper}>
                        <List className={classes.root}>
                            <Typography component="h3" variant="h5">
                                Order Items
                            </Typography>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <List>
                                    {order.orderItems.map((item, index) => (
                                        <ListItem key={index}>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <ButtonBase className={classes.image}>
                                                        <img className={classes.img} alt={item.name} src={item.image} />
                                                    </ButtonBase>
                                                </Grid>
                                                <Grid item xs={12} sm container>
                                                    <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item xs>
                                                            <Typography variant="body2" gutterBottom>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </List>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Order Summary
                                </ListSubheader>
                            }
                            className={classes.root}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <MonetizationOnIcon />
                                </ListItemIcon>
                                <ListItemText primary={order.itemsPrice} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <LocalShippingIcon />
                                </ListItemIcon>
                                <ListItemText primary={order.shippingPrice} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText primary={order.taxPrice} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <PaymentIcon />
                                </ListItemIcon>
                                <ListItemText primary={order.totalPrice} />
                            </ListItem>
                            {!order.isPaid && (
                                <ListItem>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListItem>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListItem>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListItem>
                                )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
}

export default Order;