import * as types from 'src/constants/postConstants';

export const postListReducer = (state = { posts: [] }, action) => {
    switch(action.type) {
        case types.POST_LIST_REQUEST:
            return { loading: true, posts: []};
        case types.POST_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload.posts,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count,
            };
        case types.POST_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const postDetailReducer = (
    state = { post: {} },
    action
) => {
    switch(action.type) {
        case types.POST_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.POST_DETAILS_SUCCESS:
            return { loading: false, post: action.payload };
        case types.POST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.POST_DELETE_REQUEST:
            return { loading: true };
        case types.POST_DELETE_SUCCESS:
            return { loading: false, success: true };
        case types.POST_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.POST_CREATE_REQUEST:
            return { loading: true };
        case types.POST_CREATE_SUCCESS:
            return { loading: false, success: true, post: action.payload };
        case types.POST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.POST_CREATE_RESET:
            return {};
        default:
            return state;
    };
};

export const postUpdateReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case types.POST_UPDATE_REQUEST:
            return { loading: true };
        case types.POST_UPDATE_SUCCESS:
            return { loading: false, success: true, post: action.payload };
        case types.POST_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case types.POST_UPDATE_RESET:
            return { post: {} };
        default:
            return state;
    };   
};