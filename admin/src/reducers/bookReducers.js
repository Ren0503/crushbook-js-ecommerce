import * as types from 'src/constants/bookConstants';

export const bookListReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case types.BOOK_LIST_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_LIST_SUCCESS:
            return {
                loading: false,
                books: action.payload.books,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count,
            };
        case types.BOOK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const bookDetailsReducer = (
    state = { book: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case types.BOOK_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.BOOK_DETAILS_SUCCESS:
            return { loading: false, book: action.payload };
        case types.BOOK_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const bookDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.BOOK_DELETE_REQUEST:
            return { loading: true };
        case types.BOOK_DELETE_SUCCESS:
            return { loading: false, success: true };
        case types.BOOK_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const bookCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.BOOK_CREATE_REQUEST:
            return { loading: true };
        case types.BOOK_CREATE_SUCCESS:
            return { loading: false, success: true, book: action.payload };
        case types.BOOK_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.BOOK_CREATE_RESET:
            return {};
        default:
            return state;
    };
};

export const bookUpdateReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case types.BOOK_UPDATE_REQUEST:
            return { loading: true };
        case types.BOOK_UPDATE_SUCCESS:
            return { loading: false, success: true, book: action.payload };
        case types.BOOK_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case types.BOOK_UPDATE_RESET:
            return { book: {} };
        default:
            return state;
    };
};