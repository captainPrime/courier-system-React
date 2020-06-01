import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    SHIPPING_REQUEST,
    AUTH_ADMIN,
    ADMIN_USER
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function AdminUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/Admin`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADMIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function adminAuth() {
    const request = axios.get(`${USER_SERVER}/adminAuth`)
        .then(response => response.data);

    return {
        type: AUTH_ADMIN,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function shippingRequest(data) {
    const request = axios.post(`/api/shipping-request/shippingRequest`, data)

        .then(response => response.data);

    return {
        type: SHIPPING_REQUEST,
        payload: request
    }
}

