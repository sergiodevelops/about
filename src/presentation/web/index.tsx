import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import App from './App';
import store from './../../app/store'
import './index.css';


let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);