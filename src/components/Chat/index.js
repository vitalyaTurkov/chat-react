import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login, newMessage, changeNextTypeOfMessage, newMessages} from '../../store/actions'
import Auth from '../Auth'
import {Message} from '../Message'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'


class Chat extends React.Component {

    static propTypes = {
      mLogin: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.object),
      nextTypeOfMessage: PropTypes.string
    };

    constructor() {
        super();
        window.addEventListener('storage', this.changeStorage);
    }

    mountInput = input => this.messageInput = input;

    handleKeyPress = e => {
        if(e.key === 'Enter') {
            this.onSendMessage_click();
        }
    };

    changeStorage = () => {
        let messages = JSON.parse(localStorage.getItem('messages'));
        let nextTypeOfMessage = localStorage.getItem('nextTypeOfMessage');

        if (messages === null) {
            messages = [];
        }
        this.props.newMessage(messages);
        this.props.changeNextTypeOfMessage(nextTypeOfMessage);
    };

    onSendMessage_click = () => {
        if (!this.messageInput.value) {
            return;
        }

        const {mLogin, messages, nextTypeOfMessage} = this.props;
        const date = new Date().toString();

        if (nextTypeOfMessage === null) {
            this.props.changeNextTypeOfMessage("message-candidate");
        }

        const message = {
            textMessage: this.messageInput.value,
            writer: mLogin,
            date: date,
            type: nextTypeOfMessage
        };

        this.props.newMessage(message);

        if (nextTypeOfMessage === "message-candidate") {
            this.props.changeNextTypeOfMessage("message-hiring-manager");
            localStorage.setItem('nextTypeOfMessage', "message-hiring-manager");
        }
        else {
            this.props.changeNextTypeOfMessage("message-candidate");
            localStorage.setItem('nextTypeOfMessage', "message-candidate");
        }

        localStorage.setItem('messages', JSON.stringify([...messages, message]));

        this.messageInput.value = '';
    };

    render() {
        const {mLogin, messages} = this.props;
        if(mLogin === "") {
            return (
                <div>
                    <Auth login={this.props.login}/>
                </div>
            )
        }
        else {
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
                                            console.log(item);
                                            return <Message key={item.date + item.textMessage}
                                                            textMessage={item.textMessage}
                                                            date={item.date}
                                                            typeOfMessage={item.type}
                                                            writer={item.writer}
                                            />
                                        })
                                    }
                                    <div className="input-group">
                                        <input type="text"
                                               className="form-control"
                                               id="textMessage"
                                               ref={this.mountInput}
                                               onKeyPress={this.handleKeyPress}
                                               autoFocus={true}
                                        />
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
}

const putStateToProps = (state) => {
    return {
        mLogin: state.mLogin,
        messages: state.messages,
        nextTypeOfMessage: state.nextTypeOfMessage
    }
};

const putActionsToProps = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
        newMessage: bindActionCreators(newMessage, dispatch),
        changeNextTypeOfMessage: bindActionCreators(changeNextTypeOfMessage, dispatch),
        newMessages: bindActionCreators(newMessages, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(Chat);
