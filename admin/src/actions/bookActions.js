import axios from 'axios';
import { logout } from './userActions';
import * as types from 'src/constants/bookConstants';

export const listBooks = (pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_LIST_REQUEST });

        const { data } = await axios.get(
            `/api/books?pageNumber=${pageNumber}`
        );

        dispatch({
            type: types.BOOK_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const detailBook = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/books/${id}`);

        dispatch({
            type: types.BOOK_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createBook = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(`/api/books`, {}, config);

        dispatch({
            type: types.BOOK_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.BOOK_CREATE_FAIL,
            payload: message,
        });
    };
};

export const updateBook = (book) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_UPDATE_REQUEST });

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
            `/api/books/${book._id}`,
            book,
            config
        );

        dispatch({
            type: types.BOOK_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.BOOK_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.BOOK_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deleteBook = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/books/${id}`, config);

        dispatch({
            type: types.BOOK_DELETE_SUCCESS,
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
            type: types.BOOK_DELETE_FAIL,
            payload: message,
        });
    };
};
