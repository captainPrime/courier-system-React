import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    SHIPPING_REQUEST,
    AUTH_ADMIN,
    ADMIN_USER
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case ADMIN_USER:
            return { ...state, loginSucces: action.payload, isAdmin: true }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case AUTH_ADMIN:
            return { ...state, adminData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case SHIPPING_REQUEST:
            return {
                ...state,
                shippingRequest: action.payload
            }
        default:
            return state;
    }
}