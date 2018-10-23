import {ACTION_LOGIN, ACTION_NEW_MESSAGE, ACTION_NEXT_TYPE_OF_MESSAGE, ACTION_NEW_MESSAGES} from './actionTypes'

export const login = (mLogin) => {
    return {
        type: ACTION_LOGIN,
        payload: mLogin
    };
};

export const newMessage = (message) => {
    return {
        type: ACTION_NEW_MESSAGE,
        payload: message
    };
};

export const newMessages = (messages) => {
    return {
        type: ACTION_NEW_MESSAGES,
        payload: messages
    };
};

export const changeNextTypeOfMessage = (type) => {
    return {
        type: ACTION_NEXT_TYPE_OF_MESSAGE,
        payload: type
    }
};
