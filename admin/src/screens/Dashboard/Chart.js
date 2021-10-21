import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    XAxis,
    YAxis,
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import { listOrders } from 'src/actions/orderActions'
import Message from 'src/components/Message';
import Loader from 'src/components/Loader';
import { format, subDays, addDays } from 'date-fns';

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date) =>
    new Date(date).toLocaleDateString();

const OneDay = (orders) =>
    orders.reduce((acc, curr) => {
        const day = curr.createdAt.substring(0, 10);
        if (!acc[day]) {
            acc[day] = 0;
        }
        acc[day] += curr.totalPrice;
        return acc;
    }, {});

const getRevenue = (orders) => {
    const daysWithRevenue = OneDay(orders);
    console.log(daysWithRevenue);
    lastMonthDays.map(date => console.log(format(date, 'yyyy-MM-dd')));
    return lastMonthDays.map(date => ({
        date: date.getTime(),
        totalPrice: daysWithRevenue[format(date, 'yyyy-MM-dd')] || 0,
    }));
}

export default function Chart() {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Typography>30 Day Revenue History</Typography>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <ResponsiveContainer>
                    <AreaChart
                        data={getRevenue(orders)}
                    >
                        <defs>
                            <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#8884d8"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#8884d8"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            name="Date"
                            type="number"
                            scale="time"
                            domain={[
                                addDays(aMonthAgo, 1).getTime(),
                                new Date().getTime(),
                            ]}
                            tickFormatter={dateFormatter}
                        />
                        <YAxis dataKey="totalPrice" name="Revenue" unit="$" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={value =>
                                new Intl.NumberFormat(undefined, {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(value)
                            }
                            labelFormatter={(label) =>
                                dateFormatter(label)
                            }
                        />
                        <Area
                            type="monotone"
                            dataKey="totalPrice"
                            stroke="#8884d8"
                            strokeWidth={2}
                            fill="url(#colorUv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </React.Fragment>
    );
}