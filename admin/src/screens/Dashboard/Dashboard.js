import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MainLayout from 'src/layouts/MainLayout';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import Chart from './Chart';
import NewUsers from './NewUsers';
import NewOrders from './NewOrders';
import NewBooks from './NewBooks';
import NewPosts from './NewPosts';
import imageAdmin from 'src/animation.gif';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    basicHeight: {
        height: 240,
    },
    fixedHeight: {
        height: 360,
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
}));

const Dashboard = ({ history }) => {
    const classes = useStyles();
    const basicHeightPaper = clsx(classes.paper, classes.basicHeight);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    return (
        <MainLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CardActionArea component="a" href="#">
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        Admin Dashboard
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        Manage books, order and customers
                                    </Typography>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image={imageAdmin} title="Admin" />
                            </Hidden>
                        </Card>
                    </CardActionArea>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={basicHeightPaper}>
                        <Chart />
                    </Paper>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <NewOrders />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <NewUsers />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <NewBooks />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <NewPosts />
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
}

export default Dashboard;
