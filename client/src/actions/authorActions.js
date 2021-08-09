import axios from 'axios';
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

export const listTopAuthors = () => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_TOP_REQUEST });

        const { data } = await axios.get(`/api/authors/top`);

        dispatch({
            type: types.AUTHOR_TOP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.AUTHOR_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}