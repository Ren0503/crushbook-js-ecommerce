import { combineReducers } from 'redux';

import {
    bookListReducer,
    bookDetailsReducer,
    bookCreateReducer,
    bookUpdateReducer,
    bookDeleteReducer,
} from 'src/reducers/bookReducers';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer,
    userUpdateReducer,
    userDeleteReducer,
} from 'src/reducers/userReducers';

import {
    orderDetailReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListReducer,
} from 'src/reducers/orderReducers';

import { 
    authorListReducer,
    authorDetailReducer,
    authorCreateReducer,
    authorDeleteReducer,
    authorUpdateReducer,
} from 'src/reducers/authorReducers'

import { 
    postListReducer,
    postDetailReducer,
    postCreateReducer,
    postDeleteReducer,
    postUpdateReducer,
} from 'src/reducers/postReducers'

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetail: bookDetailsReducer,
    bookCreate: bookCreateReducer,
    bookUpdate: bookUpdateReducer,
    bookDelete: bookDeleteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    authorList: authorListReducer,
    authorDetail: authorDetailReducer,
    authorCreate: authorCreateReducer,
    authorDelete: authorDeleteReducer,
    authorUpdate: authorUpdateReducer,
    postList: postListReducer,
    postDetail: postDetailReducer,
    postCreate: postCreateReducer,
    postDelete: postDeleteReducer,
    postUpdate: postUpdateReducer,
});

export default reducer;