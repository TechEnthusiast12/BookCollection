import React from 'react';
import ReactDOM from 'react-dom/client';
import AppState from './context/AppState';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AppState>
    <App />
    <ToastContainer />
</AppState>


);
