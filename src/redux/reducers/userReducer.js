import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_KRUISE,
    UNLIKE_KRUISE,
    MARK_NOTIFICATION_READ
} from '../types';

const initialState = {
    authenticated: false,
    loadingUser: false,
    credentials: {},
    likes: [],
    notifications: [],
};


export default (state = initialState, action) => {
    /**
     * Depending on the action type our app dispatches, our reducer REACTs(pun) to it.
     *
     * - SET_UNAUTHENTICATED: When we logout, we set our application state to its initial value
     *
     * - SET_USER: The data we get from our API is structured like our initialState,
     * so we spread the payload we get because the keys will match
     */
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...action.payload,
                authenticated: true,
                loadingUser: false
            };
        case LOADING_USER:
            return {
                ...state,
                loadingUser: true,
            };
        case LIKE_KRUISE:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        kruiseId: action.payload.kruiseId
                    }
                ]
            };
        case UNLIKE_KRUISE:
            return {
                ...state,
                likes: state.likes.filter((like) => like.kruiseId !== action.payload.kruiseId)
            };
        case MARK_NOTIFICATION_READ:
            state.notifications.forEach( notification => notification.read = true);
            return {
                ...state
            };
        default:
            return state
    }

}
