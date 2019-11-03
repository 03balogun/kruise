import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, SUBMITTING_COMMENT} from '../types';

const initialState = {
    isLoading: false,
    errors: null,
    isSubmittingComment: false
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                isLoading: false,
                errors: null
            };
        case LOADING_UI:
            return {
              ...state,
              isLoading: true
            };
        case STOP_LOADING_UI:
            return {
              ...state,
              isLoading: false
            };
       case SUBMITTING_COMMENT:
            return {
              ...state,
                isSubmittingComment: action.payload
            };
        default:
            return state

    }

}
