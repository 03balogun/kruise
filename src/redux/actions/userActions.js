/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/3/19
 * Time: 10:15 PM
 */
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    API_AUTH_TOKEN,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATION_READ
} from '../types';
import axios from "../../plugins/axios";
import jwtDecode from "jwt-decode";

export const loginUser = (userData, history) => async (dispatch) => {
    dispatch({type: LOADING_UI});
    try {
        console.log('Ji! Masun');
        const data = (await axios.post('/login', userData)).data;
        setAuthorizationHeader(data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});

        history.push('/');
    } catch (error) {
        console.log(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response
                ? error.response.data : {general: 'Network error, please try again.'}
        })
    }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
    dispatch({type: LOADING_UI});
    try {
        console.log('Moni ko Ji! masun');
        const data = (await axios.post('/signup', newUserData)).data;
        setAuthorizationHeader(data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});

        history.push('/');
    } catch (error) {
        console.log(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response
                ? error.response.data : {general: 'Network error, please try again.'}
        })
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem(API_AUTH_TOKEN);
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
};

export const getUserData = (token = null) => async (dispatch) => {
    try {
        dispatch({type: LOADING_USER});
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        }
        const payload = (await axios.get('/user')).data;
        dispatch({type: SET_USER, payload});
    } catch (error) {
        console.log(error);
    }
};

export const checkAuthentication = (location) => (dispatch) => {
    const token = localStorage.getItem(API_AUTH_TOKEN);
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(logout());
            location.href = '/login';
        } else {
            dispatch({type: SET_AUTHENTICATED});
            dispatch(getUserData(token));
        }
    }
};

export const uploadProfileImage = (formData) => async (dispatch) => {
    try {
        dispatch({type: LOADING_USER});
        await axios.post('/user/image', formData);
        dispatch(getUserData());
    } catch (error) {
        console.log(error)
    }
};

export const markNotificationsRead = (notificationIds) => async (dispatch) => {
    try {
        await axios.post('/notifications', notificationIds);
        dispatch({type: MARK_NOTIFICATION_READ});
    } catch (error) {
        console.log(error)
    }
};

export const editUserDetails = (userDetails) => async (dispatch) => {
    try {
        dispatch({type: LOADING_USER});
        await axios.post('/user', userDetails);
        dispatch(getUserData());
    } catch (error) {
        console.log(error)
    }
};

function setAuthorizationHeader(token) {
    const authToken = `Bearer ${token}`;
    localStorage.setItem(API_AUTH_TOKEN, authToken);
    axios.defaults.headers.common['Authorization'] = authToken;
}
