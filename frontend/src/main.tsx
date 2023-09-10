import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Navigation from './components/ui/Navigation.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navigation/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)
