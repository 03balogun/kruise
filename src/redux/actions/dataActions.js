import axios from "../../plugins/axios";
import {
    LOADING_DATA,
    SET_KRUISES,
    LIKE_KRUISE,
    UNLIKE_KRUISE,
    DELETE_KRUISE,
    LOADING_UI,
    ADD_KRUISE,
    SUBMIT_COMMENT,
    SET_ERRORS, CLEAR_ERRORS, SET_KRUISE, STOP_LOADING_UI, SUBMITTING_COMMENT
} from '../types';

export const getKruises = () => async (dispatch) => {
    try {
        dispatch({type: LOADING_DATA});
        const payload = (await axios.get('/kruises')).data;
        dispatch({type: SET_KRUISES, payload});
    } catch (error) {
        console.log(error);
        dispatch({type: SET_KRUISES, payload: []});
    }
};

export const getPost = (kruiseId) => async (dispatch) => {
    try {
        dispatch({type: LOADING_UI});
        const payload = (await axios.get(`/kruise/${kruiseId}`)).data;
        dispatch({type: SET_KRUISE, payload});
        dispatch({type: STOP_LOADING_UI});
    } catch (error) {
        console.log(error);
        dispatch({type: SET_KRUISES, payload: []});
    }
};

export const addKruise = (kruiseData) => async (dispatch) => {
    try {
        dispatch({type: LOADING_UI});
        const payload = (await axios.post('/kruise', kruiseData)).data;
        dispatch({type: ADD_KRUISE, payload});
        dispatch(clearErrors());
    } catch (error) {
        console.log(error);
        dispatch({type: SET_ERRORS, payload: error.response.data});
    }
};

export const likeKruise = (kruiseId) => async (dispatch) => {
    try {
        const payload = (await axios.get(`/kruise/${kruiseId}/like`)).data;
        dispatch({type: LIKE_KRUISE, payload})
    } catch (error) {
        console.log(error);
    }
};

export const unlikeKruise = (kruiseId) => async (dispatch) => {
    try {
        const payload = (await axios.get(`/kruise/${kruiseId}/unlike`)).data;
        dispatch({type: UNLIKE_KRUISE, payload})
    } catch (error) {
        console.log(error);
    }
};

export const submitComment = (kruiseId, commentData) => async (dispatch) => {
    try {
        dispatch({type: SUBMITTING_COMMENT, payload: true});
        const payload = (await axios.post(`/kruise/${kruiseId}/comment`, commentData)).data;
        dispatch({type: SUBMIT_COMMENT, payload});
        dispatch(clearErrors());
        dispatch({type: SUBMITTING_COMMENT, payload: false});
    } catch (error) {
        console.log(error);
        dispatch({type: SET_ERRORS, payload: error.response.data});
    }
};

export const getUserData = (handle) => async (dispatch) => {
    try {
        dispatch({type: LOADING_DATA});
        const payload = (await axios.get(`/user/${handle}`)).data;
        dispatch({type: SET_KRUISES, payload: payload.kruises});
    }catch (error) {
        console.log(error);
    }

};

export const deleteKruise = (kruiseId) => async (dispatch) => {
    try {
        await axios.delete(`/kruise/${kruiseId}`);
        dispatch({type: DELETE_KRUISE, payload: kruiseId})
    } catch (error) {
        console.log(error);
    }
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
