import {IAccess, IRegisterCustomer, IUser} from "../models";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.ts";
import axios, {AxiosError} from "axios";
import {API_URL} from "../http";
import TokenService from "../services/TokenService.ts";


function parse_errors(data: Object): any[] {
    const errors = [];
    for (const [key, value] of Object.entries(data)) {
        if (value.constructor === Array || typeof value === "string") {
            errors.push(`${key}: ${value}`)
        } else {
            errors.push(...parse_errors(value));
        }
    }
    return errors;
}


export default class Store {
    isAuth = false;
    errors: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setErrors(errors: any[]) {
        this.errors = errors;
    }

    logout() {
        TokenService.cleatTokensFromLocalStorage();
        this.setAuth(false);
    }

    async login(user: IUser) {
        try {
            this.setErrors([]);
            const response = await AuthService.login(user);
            console.log(response.data);
            TokenService.saveTokensToLocalStorage(response.data)
            this.setAuth(true);
        } catch (exception) {
            console.log("login", (exception as AxiosError).message);
            console.log("login", (exception as AxiosError).response?.data);

            return parse_errors((exception as AxiosError).response?.data as object);
        }
    }

    async register(customer: IRegisterCustomer) {
        try {
            this.setErrors([]);
            const response = await AuthService.register(customer);
            console.log(response.data);
            await this.login({username: customer.user.username, password: customer.user.password});
        } catch (exception) {
            console.log("register",(exception as AxiosError).message);
            console.log("register",(exception as AxiosError).response?.data);

            return parse_errors((exception as AxiosError).response?.data as object);
        }
    }



    async checkAuth() {
        try {
            const response = await axios.post<IAccess>(
                `${API_URL}/token/refresh/`,
                {
                    refresh: TokenService.loadTokensFromLocalStorage().refresh,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response.data)
            TokenService.saveAccessTokenToLocalStorage(response.data.access);
            this.setAuth(true);
        } catch (exception) {
            console.log("checkAuth", (exception as AxiosError).message);
            console.log("checkAuth", (exception as AxiosError).response?.data);
        }
    }
}