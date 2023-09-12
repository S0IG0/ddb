import $api from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse, RegisterResponse} from "../models/response/AuthResponse.ts";
import {IRegisterCustomer, IUser} from "../models";

export default class AuthService {
    static async login(user: IUser): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/token/", user);
    }

    static async register(customer: IRegisterCustomer): Promise<AxiosResponse<RegisterResponse>> {
        return $api.post<RegisterResponse>("/customer/register/", customer);
    }
}