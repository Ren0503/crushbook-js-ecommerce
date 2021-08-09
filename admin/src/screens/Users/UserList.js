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
import { listUsers, deleteUser } from 'src/actions/userActions'
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from '@material-ui/core/Avatar';
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

const UserList = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <MainLayout>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USER LIST
            </Typography>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>AVATAR</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>ADMIN</TableCell>
                            <TableCell>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <Avatar alt="Avatar User" src={user.avatar} />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.isAdmin ? (
                                        <CheckCircleIcon />
                                    ) : (
                                        <HighlightOffIcon />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/users/${user._id}/edit`} onClick={(e) => e.preventDefault}>
                                        <Button variant="contained" color="secondary" href="">
                                            <EditIcon />
                                        </Button>
                                    </Link>
                                    <Button variant="contained" color="primary" onClick={() => deleteHandler(user._id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            )}
        </MainLayout>
    );
}

export default UserList;