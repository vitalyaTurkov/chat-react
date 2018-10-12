import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login, newMessage, changeNextTypeOfMessage} from '../../store/actions'
import Auth from '../Auth'
import {Message} from '../Message'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'


//Главный компонент
//Рендерит окно входа, если свойство с именем пользователя пустое
//Рендерит чат, если свойство с именем пользователя не пустое
class Chat extends React.Component {

    propTypes = {
      mLogin: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.object),
      nextTypeOfMessage: PropTypes.string
    };

    constructor() {
        super();
        //Отслеживаем изменения localStorage, чтобы автоматически обновлять новые данные на странице
        window.addEventListener('storage', this.changeStorage);
    }

    //Рендерим окно авторизации, если не выполнен вход. Вход не выполнен, если поле mLogin = ""
    render() {
        const {mLogin, messages} = this.props;
        if(mLogin === "") {
            return (
                <div>
                    <Auth parent={this}/> {/*Передаем родителя, чтобы в компоненте потом изменить логин родителя*/}
                </div>
            )
        }
        else {
            //Рендер чата
            return (
                <div>
                    <h2 className="text-center">Чат</h2>
                    <div className="container">
                        <div className="messaging">
                            <div className="row justify-content-center">
                                <div className="col-md-12">

                                    {/*Вывод всех сообщений на экран*/}
                                    {
                                        messages.map((item) => {
                                            return <Message key={item.date}
                                                          textMessage={item.textMessage}
                                                          date={item.date}
                                                          typeOfMessage={item.type}
                                                          writer={item.writer}
                                                            />
                                        })
                                    }
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="textMessage"
                                                ref={(input) => this.messageInput = input}/>
                                        <span className="input-group-btn">
                                            <button
                                                className="btn btn-default"
                                                type="submit"
                                                onClick={this.onSendMessage_click}
                                            >Отправить</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    //Обработчик события "Изменение localStorage"
    //Считываем все сообщения из localStorage и записываем их в states Chat
    //Меня тип следущего выводимого сообщения, отталкиваясь от типа предыдущего сообщения
    changeStorage = () => {
        let messages = JSON.parse(localStorage.getItem('messages'));
        let nextTypeOfMessage = localStorage.getItem('nextTypeOfMessage');

        if (messages === null) {
            messages = [];
        }
        this.props.newMessage(messages);
        this.props.changeNextTypeOfMessage(nextTypeOfMessage);
    };

    //Обработчик события нажатия на кнопку "Отправить"
    //Формируем новое сообщение, записываем его в конец массива сообщений и отправляем получившийся массив
    //в свойста Chat
    //Меняем тип следущего сообщения на новый
    //Записываем получившейся массив сообщений в localStorage
    onSendMessage_click = () => {
        const {mLogin, messages, nextTypeOfMessage} = this.props;
        const date = new Date().toString();

        if (nextTypeOfMessage === null) {
            this.props.changeNextTypeOfMessage("message-candidate");
        }

        messages[messages.length] = {
            textMessage: this.messageInput.value,
            writer: mLogin,
            date: date,
            type: nextTypeOfMessage
        };

        this.props.newMessage(messages);

        localStorage.clear();

        if (nextTypeOfMessage === "message-candidate") {
            this.props.changeNextTypeOfMessage("message-hiring-manager");
            localStorage.setItem('nextTypeOfMessage', "message-hiring-manager");
        }
        else {
            this.props.changeNextTypeOfMessage("message-candidate");
            localStorage.setItem('nextTypeOfMessage', "message-candidate");
        }

        localStorage.setItem('messages', JSON.stringify(messages));

        this.messageInput.value = '';
    }
}

//Функция используется для импорта состояний в свойства Chat
const putStateToProps = (state) => {
    return {
        mLogin: state.mLogin,
        messages: state.messages,
        nextTypeOfMessage: state.nextTypeOfMessage
    }
};

//Функция используется для импорта actions в свойства Chat
const putActionsToProps = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
        newMessage: bindActionCreators(newMessage, dispatch),
        changeNextTypeOfMessage: bindActionCreators(changeNextTypeOfMessage, dispatch)
    }
};

//Связываем хранилище redux с компонентом Chat
export default connect(putStateToProps, putActionsToProps)(Chat);