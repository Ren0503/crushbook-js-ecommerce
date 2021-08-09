import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';
import { listOrders } from 'src/actions/orderActions'
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MainLayout from 'src/layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const OrderList = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                ORDER LIST
            </Typography>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>USER</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>DELIVERED</TableCell>
                            <TableCell align="right">VIEW</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={order._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{order.user && order.user.name}</TableCell>
                                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                                <TableCell>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <HighlightOffIcon />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <HighlightOffIcon />
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={`/orders/${order._id}`} onClick={(e) => e.preventDefault}>
                                        <Button variant="contained" color="primary" href="">
                                            <VisibilityIcon />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </MainLayout>
    );
}

export default OrderList;