import * as types from 'src/constants/orderConstants'

export const orderDetailReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case types.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case types.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    };
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_PAY_REQUEST:
            return {
                loading: true,
            };
        case types.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case types.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case types.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    };
};

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            };
        case types.ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case types.ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case types.ORDER_DELIVER_RESET:
            return {};
        default:
            return state;
    };
};

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case types.ORDER_LIST_REQUEST:
            return {
                loading: true,
            };
        case types.ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case types.ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    };
};
