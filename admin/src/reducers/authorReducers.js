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
                count: action.payload.count,
            };
        case types.AUTHOR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const authorDetailReducer = (
    state = { author: {} },
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

export const authorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.AUTHOR_DELETE_REQUEST:
            return { loading: true };
        case types.AUTHOR_DELETE_SUCCESS:
            return { loading: false, success: true };
        case types.AUTHOR_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const authorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.AUTHOR_CREATE_REQUEST:
            return { loading: true };
        case types.AUTHOR_CREATE_SUCCESS:
            return { loading: false, success: true, author: action.payload };
        case types.AUTHOR_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.AUTHOR_CREATE_RESET:
            return {};
        default:
            return state;
    };
};

export const authorUpdateReducer = (state = { author: {} }, action) => {
    switch (action.type) {
        case types.AUTHOR_UPDATE_REQUEST:
            return { loading: true };
        case types.AUTHOR_UPDATE_SUCCESS:
            return { loading: false, success: true, author: action.payload };
        case types.AUTHOR_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case types.AUTHOR_UPDATE_RESET:
            return { author: {} };
        default:
            return state;
    };   
};