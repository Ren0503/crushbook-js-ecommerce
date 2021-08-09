import axios from 'axios';
import { logout } from './userActions';
import * as types from 'src/constants/orderConstants';

export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.ORDER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: message,
        });
    };
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config,
        );

        dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_PAY_FAIL,
            payload: message,
        });
    };
};

export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_DELIVER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            config,
        );

        dispatch({
            type: types.ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_DELIVER_FAIL,
            payload: message,
        });
    };
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.ORDER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders`, config);

        dispatch({
            type: types.ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_LIST_FAIL,
            payload: message,
        });
    };
};