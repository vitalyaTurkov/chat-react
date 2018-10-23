import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'

//Компонент авторизации
//При успешной авторизации изменит свойство родителя mLogin на введенное в поле имя
export default class Auth extends React.Component {
    static propTypes = {
        parent: PropTypes.object
    };

    mountInput = input => this.loginInput = input;

    handleKeyPress = e => {
        if(e.key === 'Enter') {
            this.handleAuth();
        }
    };

    handleAuth = () => {
        if(this.loginInput.value !== '') {
            this.props.login(this.loginInput.value);
        }
        else {
            alert("Введи свое имя");
        }
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <span className="heading">ВХОД В ЧАТ</span>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           id="inputLogin" placeholder="Имя"
                                           ref={this.mountInput}
                                           onKeyPress={this.handleKeyPress}
                                           autoFocus={true}/>
                                    <i className="fa fa-user"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit"
                                            className="btn btn-default"
                                            onClick={this.handleAuth}>
                                        ВХОД
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
