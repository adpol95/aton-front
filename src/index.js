import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import Authorization from "./components/Authorization";
import Clients from "./components/Clients";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const root = ReactDOM.createRoot(document.getElementById('root'));

const storeAuth = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
    // refresh: my_refresh_api
});
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Authorization/>
            },
            {
                path: "/clients",
                element: <RequireAuth fallbackPath={'/authorization'}>
                    <Clients/>
                </RequireAuth>
            }
        ]
    }
]);
root.render(
    <AuthProvider store={storeAuth}>
        <RouterProvider router={router}/>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
