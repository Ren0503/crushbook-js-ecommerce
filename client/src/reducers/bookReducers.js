import * as types from '../constants/bookConstants';

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
    }
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
    }
};

export const bookReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.BOOK_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case types.BOOK_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case types.BOOK_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case types.BOOK_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const bookTopRatedReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case types.BOOK_TOP_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_TOP_SUCCESS:
            return { loading: false, books: action.payload };
        case types.BOOK_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookSaleReducer = (state= { books: []}, action) => {
    switch(action.type) {
        case types.BOOK_SALE_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_SALE_SUCCESS:
            return { loading: false, books: action.payload};
        case types.BOOK_SALE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const bookNewReleasesReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case types.BOOK_RELEASE_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_RELEASE_SUCCESS:
            return { loading: false, books: action.payload };
        case types.BOOK_RELEASE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
