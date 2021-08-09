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
            };
        case types.POST_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const postDetailReducer = (
    state = { post: { comments: [] } },
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

export const postCommentCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case types.POST_CREATE_COMMENT_REQUEST:
            return { loading: true };
        case types.POST_CREATE_COMMENT_SUCCESS:
            return { loading: false, success: true};
        case types.POST_CREATE_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        case types.POST_CREATE_COMMENT_RESET:
            return {};
        default:
            return state;
    }
};

export const postTopViewReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case types.POST_TOP_REQUEST:
            return { loading: true, posts: [] };
        case types.POST_TOP_SUCCESS:
            return { loading: false, posts: action.payload };
        case types.POST_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};