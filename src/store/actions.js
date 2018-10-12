import {ACTION_LOGIN} from './actionTypes'
import {ACTION_NEW_MESSAGE} from './actionTypes'
import {ACTION_NEXT_TYPE_OF_MESSAGE} from "./actionTypes";

export const login = (mLogin) => {
    return {
        type: ACTION_LOGIN,
        payload: mLogin
    };
};

export const newMessage = (messages) => {
    return {
        type: ACTION_NEW_MESSAGE,
        payload: messages
    };
};

export const changeNextTypeOfMessage = (type) => {
    return {
        type: ACTION_NEXT_TYPE_OF_MESSAGE,
        payload: type
    }
};
