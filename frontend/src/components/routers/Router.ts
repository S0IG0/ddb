import {JSX} from "react";
import App from "../../App.tsx";
import Upload from "../pages/Upload.tsx";

export interface IRoute {
    path: string,
    name: string
    component: () => JSX.Element
}

export enum RoutesNames {
    UPLOAD = 'upload',
    HOME = 'home',
}

export const routers: Map<string, IRoute> = new Map<string, IRoute>()
    .set(RoutesNames.HOME, {path: '/', name: RoutesNames.HOME, component: App})
    .set(RoutesNames.UPLOAD, {path: '/upload', name: RoutesNames.UPLOAD, component: Upload})
