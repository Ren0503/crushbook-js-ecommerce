import axios from 'axios'
import { logout } from './userActions'
import * as types from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.ORDER_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: types.ORDER_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })

        localStorage.removeItem('cartItems')
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.ORDER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config,
        )

        dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_DELIVER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            config,
        )

        dispatch({
            type: types.ORDER_DELIVER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_DELIVER_FAIL,
            payload: message,
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.ORDER_LIST_MY_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/my_orders`, config)

        dispatch({
            type: types.ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_LIST_MY_FAIL,
            payload: message,
        })
    }
}