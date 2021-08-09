import axios from 'axios';
import { logout } from './userActions';
import * as types from 'src/constants/postConstants';

export const listPosts = (keyword = '', pageNumber = '') => async (dispatch) => {
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

export const createPostComment = (postId, comment) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.POST_CREATE_COMMENT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        await axios.post(`/api/posts/${postId}/comments`, comment, config);

        dispatch({
            type: types.POST_CREATE_COMMENT_SUCCESS,
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
            type: types.POST_CREATE_COMMENT_FAIL,
            payload: message,
        });
    }
};

export const listTopPosts = () => async (dispatch) => {
    try {
        dispatch({ type: types.POST_TOP_REQUEST });

        const { data } = await axios.get(`/api/posts/top`);

        dispatch({
            type: types.POST_TOP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.POST_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};