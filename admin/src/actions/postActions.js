import axios from 'axios';
import { logout } from './userActions';
import * as types from 'src/constants/postConstants';

export const listPosts = (keyword= '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.POST_LIST_REQUEST });

        const { data } = await axios.get(
            `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
        );

        dispatch({
            type: types.POST_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const detailPosts = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.POST_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: types.POST_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.POST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createPost = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.POST_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(`/api/posts`, {}, config);

        dispatch({
            type: types.POST_CREATE_SUCCESS,
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
            type: types.POST_CREATE_FAIL,
            payload: message,
        });
    };
};

export const updatePost = (post) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.POST_UPDATE_REQUEST });

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
            `/api/posts/${post._id}`,
            post,
            config
        );

        dispatch({
            type: types.POST_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.POST_DETAILS_SUCCESS,
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
            type: types.POST_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deletePost = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: types.POST_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/posts/${id}`, config);

        dispatch({
            type: types.POST_DELETE_SUCCESS,
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
            type: types.POST_DELETE_FAIL,
            payload: message,
        });
    };
}