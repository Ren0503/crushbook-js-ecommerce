import * as types from 'src/constants/authorConstants';

export const authorListReducer = (state = { authors: [] }, action) => {
    switch(action.type) {
        case types.AUTHOR_LIST_REQUEST:
            return { loading: true, authors: []};
        case types.AUTHOR_LIST_SUCCESS:
            return {
                loading: false,
                authors: action.payload.authors,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case types.AUTHOR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const authorDetailReducer = (
    state = { author: { books: [] } },
    action
) => {
    switch(action.type) {
        case types.AUTHOR_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.AUTHOR_DETAILS_SUCCESS:
            return { loading: false, author: action.payload };
        case types.AUTHOR_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const authorTopReducer = (state = { authors: [] }, action) => {
    switch (action.type) {
        case types.AUTHOR_TOP_REQUEST:
            return { loading: true, authors: [] };
        case types.AUTHOR_TOP_SUCCESS:
            return { loading: false, authors: action.payload };
        case types.AUTHOR_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};