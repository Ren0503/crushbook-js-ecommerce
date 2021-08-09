import * as types from '../constants/cartConstants'

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {}},
    action
) => {
    switch(action.type) {
        case types.CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.book === item.book)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => 
                        x.book === existItem.book ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        case types.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.book !== action.payload),
            }
        case types.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case types.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case types.CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state
    }
}