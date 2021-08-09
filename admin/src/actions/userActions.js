import axios from 'axios';
import * as types from 'src/constants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            `/api/users/login`,
            { email, password },
            config,
        );

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: types.USER_LOGOUT });
    dispatch({ type: types.USER_DETAILS_RESET });
    dispatch({ type: types.USER_LIST_RESET });
    document.location.href = '/login';
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: types.USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            `/api/users`,
            { name, email, password },
            config
        );

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const getUserDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: types.USER_DETAILS_SUCCESS,
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
            type: types.USER_DETAILS_FAIL,
            payload: message,
        });
    };
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    };
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: types.USER_LIST_SUCCESS,
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
            type: types.USER_LIST_FAIL,
            payload: message,
        });
    };
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: types.USER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_DELETE_FAIL,
            payload: message,
        });
    };
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/${user._id}`, user, config);

        dispatch({ type: types.USER_UPDATE_SUCCESS });

        dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data });

        dispatch({ type: types.USER_DETAILS_RESET });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_UPDATE_FAIL,
            payload: message,
        });
    };
};