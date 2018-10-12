import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'
import './index.css'

//Компонент отвечающий за отрисовку сообщений
export const Message = (props) => {
    return (
        <div className={props.typeOfMessage}>
            <div>
                <div className="row">
                    <div className="col-xs-8 col-md-6">
                        <h4 className="message-name">{props.writer}</h4>
                    </div>
                    <div className="col-xs-4 col-md-6 text-right message-date">{props.date}</div>
                </div>
                <div className="row message-text">
                    {props.textMessage}
                </div>
            </div>
        </div>
    );
};

Message.propTypes = {
    typeOfMessage: PropTypes.string,
    writer: PropTypes.string,
    date: PropTypes.string,
    textMessage: PropTypes.string
};