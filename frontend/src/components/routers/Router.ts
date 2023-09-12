import {FC} from "react";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
export interface IRoute {
    path: string,
    name: string
    component: FC
}

export enum RoutesNames {
    Home = 'home',
    Login = 'login',
    Register = 'register',
}

export const routers: Map<string, IRoute> = new Map<string, IRoute>()
    .set(RoutesNames.Home, {path: '/', name: RoutesNames.Home, component: Home})
    .set(RoutesNames.Login, {path: '/login', name: RoutesNames.Login, component: Login})
    .set(RoutesNames.Register, {path: '/register', name: RoutesNames.Register, component: Register})
