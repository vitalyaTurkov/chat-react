import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'

//Компонент авторизации
//При успешной авторизации изменит свойство родителя mLogin на введенное в поле имя
export default class Auth extends React.Component {
    propTypes = {
        parent: PropTypes.object
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
                                    <input type="text" className="form-control" id="inputLogin" placeholder="Имя"
                                    ref={(input) => this.loginInput = input}/>
                                        <i className="fa fa-user"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit"
                                            className="btn btn-default"
                                            onClick={() => {
                                                if(this.loginInput.value !== '') {
                                                    this.props.parent.props.login(this.loginInput.value);
                                                }
                                                else {
                                                    alert("Введи свое имя");
                                                }
                                            }}>
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
