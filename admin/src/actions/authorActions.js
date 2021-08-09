import axios from 'axios';
import { logout } from './userActions';
import * as types from 'src/constants/authorConstants';

export const listAuthors = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_LIST_REQUEST });

        const { data } = await axios.get(
            `/api/authors?keyword=${keyword}&pageNumber=${pageNumber}`
        );

        dispatch({
            type: types.AUTHOR_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.AUTHOR_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const detailAuthor = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/authors/${id}`);

        dispatch({
            type: types.AUTHOR_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.AUTHOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createAuthor = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.AUTHOR_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(`/api/authors`, {}, config);

        dispatch({
            type: types.AUTHOR_CREATE_SUCCESS,
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
            type: types.AUTHOR_CREATE_FAIL,
            payload: message,
        });
    };
};

export const updateAuthor = (author) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.AUTHOR_UPDATE_REQUEST });

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
            `/api/authors/${author._id}`,
            author,
            config
        );

        dispatch({
            type: types.AUTHOR_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.AUTHOR_DETAILS_SUCCESS,
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
            type: types.AUTHOR_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deleteAuthor = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.AUTHOR_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/authors/${id}`, config);

        dispatch({
            type: types.AUTHOR_DELETE_SUCCESS,
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
            type: types.AUTHOR_DELETE_FAIL,
            payload: message,
        });
    };
};