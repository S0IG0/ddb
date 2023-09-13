import {IAccess, IRegisterCustomer, IUser} from "../models";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.ts";
import axios, {AxiosError} from "axios";
import {API_URL} from "../http";
import TokenService from "../services/TokenService.ts";
import {ResponsePosition} from "../components/pages/Account/Admin/forms/CreatePositionFrom.tsx";
import {ResponseEmployee} from "../components/pages/Account/Admin/shows/ShowEmployee.tsx";

interface Errors {
    login: any[],
    register: any[],
}

export function parse_errors(data: Object): any[] {
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
    errors: Errors = {
        login: [],
        register: [],
    };
    isLoading: boolean = false;

    positions: ResponsePosition[] = [];
    levelPositions: ResponseLevelPosition[] = [];
    departments: ResponseDepartment[] = [];
    priceLists: ResponsePriceList[] = [];
    states: ResponseState[] = [];
    employees: ResponseEmployee[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setPositions(positions: ResponsePosition[]){
        this.positions = positions;
    }

    addPosition(position: ResponsePosition) {
        this.positions.push(position);
    }

    setEmployees(employees: ResponseEmployee[]){
        this.employees = employees;
    }

    addEmployee(employee: ResponseEmployee) {
        this.employees.push(employee);
    }

    setStates(states: ResponseState[]){
        this.states = states;
    }

    addState(state: ResponseState) {
        this.states.push(state);
    }

    setPriceLists(priceLists: ResponsePosition[]){
        this.priceLists = priceLists;
    }

    addPriceList(priceList: ResponsePosition) {
        this.priceLists.push(priceList);
    }

    setDepartments(departments: ResponsePosition[]){
        this.departments = departments;
    }

    addDepartment(department: ResponsePosition) {
        this.departments.push(department);
    }


    setLevelPositions(levelPositions: ResponseLevelPosition[]){
        this.levelPositions = levelPositions;
    }

    addLevelPosition(levelPositions: ResponseLevelPosition) {
        this.levelPositions.push(levelPositions);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setErrors(errors: Errors) {
        this.errors = errors;
    }

    clearErrors() {
        this.errors = {
            login: [],
            register: [],
        };
    }

    setIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    logout() {
        TokenService.cleatTokensFromLocalStorage();
        this.setAuth(false);
    }

    async login(user: IUser) {
        try {
            this.setIsLoading(true);
            this.clearErrors();
            const response = await AuthService.login(user);
            TokenService.saveTokensToLocalStorage(response.data)
            this.setAuth(true);
        } catch (exception) {
            this.setErrors({
                login: parse_errors((exception as AxiosError).response?.data as object),
                register: [],
            });
            throw exception;
        } finally {
            this.setIsLoading(false);
        }
    }

    async register(customer: IRegisterCustomer) {
        try {
            this.setIsLoading(true);
            this.clearErrors();
            await AuthService.register(customer);
            await this.login({username: customer.user.username, password: customer.user.password});
        } catch (exception) {
            this.setErrors({
                register: parse_errors((exception as AxiosError).response?.data as object),
                login: [],
            });
            throw exception;
        } finally {
            this.setIsLoading(false);
        }
    }



    async checkAuth() {
        try {
            this.setIsLoading(true);
            const response = await axios.post<IAccess>(
                `${API_URL}/token/refresh/`,
                {
                    refresh: TokenService.loadTokensFromLocalStorage().refresh,
                },
                {
                    withCredentials: true,
                }
            );
            TokenService.saveAccessTokenToLocalStorage(response.data.access);
            this.setAuth(true);
        } catch (exception) {
        } finally {
            this.setIsLoading(false);
        }
    }
}