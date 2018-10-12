import ReactDOM from 'react-dom'
import React from 'react'
import Chat from './components/Chat'
import {createStore} from 'redux'
import {reducer} from './store/reducers'
import {Provider} from 'react-redux'
import './index.css'

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><Chat/></Provider>, document.getElementById("root"));