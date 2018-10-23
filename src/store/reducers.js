import {ACTION_LOGIN, ACTION_NEXT_TYPE_OF_MESSAGE, ACTION_NEW_MESSAGE, ACTION_NEW_MESSAGES} from './actionTypes'

//Формируем начальное состояние Chat
//Считываем все сообщения, сохраненные в localStorage
function getInitialState() {
    let messages = JSON.parse(localStorage.getItem('messages'));
    let nextTypeOfMessage = localStorage.getItem('nextTypeOfMessage');

    if(!messages) {
        messages = [];
    }

    if(!nextTypeOfMessage) {
        nextTypeOfMessage = 'message-candidate';
    }

    return {
        messages: messages,
        mLogin: "",
        nextTypeOfMessage: nextTypeOfMessage
    }
}

//Функция формирует новый state взависимости от action
//Actions:
//Изменения логина, Изменение списка сообщений, изменение типа сообщения
export const reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            return {...state, mLogin: action.payload};
        case ACTION_NEW_MESSAGE:
            return {...state, messages: [...state.messages, action.payload]};
        case ACTION_NEW_MESSAGES:
            return {...state, messages: action.payload};
        case ACTION_NEXT_TYPE_OF_MESSAGE:
            return {...state, nextTypeOfMessage: action.payload};
        default:
            return state;
    }
};
