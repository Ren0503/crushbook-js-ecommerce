import axios from 'axios';
import { logout } from './userActions';
import * as types from '../constants/bookConstants';

export const listBooks = (
    pageNumber = '', 
    sort = '',
) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_LIST_REQUEST });

        const { data } = await axios.get(
            `/api/books?pageNumber=${pageNumber}&sort=${sort}`
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
    }
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
    }
};

export const createBookReview = (bookId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/books/${bookId}/reviews`, review, config);

        dispatch({
            type: types.BOOK_CREATE_REVIEW_SUCCESS,
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
            type: types.BOOK_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
};

export const listTopBooks = () => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_TOP_REQUEST });

        const { data } = await axios.get(`/api/books/top`);

        dispatch({
            type: types.BOOK_TOP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listSaleBook = () => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_SALE_REQUEST });

        const { data } = await axios.get(`/api/books/sales`);

        dispatch({
            type: types.BOOK_SALE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_SALE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listReleasesBooks = () => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_RELEASE_REQUEST });

        const { data } = await axios.get(`/api/books/releases`);

        dispatch({
            type: types.BOOK_RELEASE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_RELEASE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const searchBooks = (
    keyword = '', 
    genres = '',
    rate,
    priceBottom,
    priceTop
) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_SEARCH_REQUEST });

        const { data } = await axios.get(
            `/api/books/search?keyword=${keyword}&genres=${genres}&rate=${rate}&bottom=${priceBottom}&top=${priceTop}`
        );

        dispatch({
            type: types.BOOK_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_SEARCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};