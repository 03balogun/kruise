/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/3/19
 * Time: 10:14 PM
 */
import {
    LOADING_DATA,
    SET_KRUISES,
    LIKE_KRUISE,
    UNLIKE_KRUISE,
    DELETE_KRUISE,
    ADD_KRUISE,
    SET_KRUISE,
    SUBMIT_COMMENT
} from '../types';

const intialState = {
    kruises: [],
    kruise: {},
    loading: false
};

export default function (state = intialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_KRUISES:
            return {
                ...state,
                kruises: action.payload,
                loading: false
            };
        case SET_KRUISE:
            return {
                ...state,
                kruise: action.payload,
                loading: false
            };
        case LIKE_KRUISE:
        case UNLIKE_KRUISE:
            // find the post index
            const index = state.kruises.findIndex(
                (kruise) => kruise.kruiseId === action.payload.kruiseId
            );
            // replace the data on that index with our new one
            state.kruises[index] = action.payload;
            if (state.kruise.kruiseId === action.payload.kruiseId) state.kruise = action.payload;
            return {...state};
        case DELETE_KRUISE:
            const postIndex = state.kruises.findIndex(
                (kruise) => kruise.kruiseId === action.payload
            );
            state.kruises.splice(postIndex, 1);
            return {
                ...state
            };
        case ADD_KRUISE:
            return {
                ...state,
                kruises: [
                    action.payload,
                    ...state.kruises
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                kruise: {
                    ...state.kruise,
                    comments: [action.payload, ...state.kruise.comments]
                }
            };
        default:
            return state
    }
}
