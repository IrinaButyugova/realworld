import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { AuthResponseInterface } from "../../types/authResponse.interface";
import { LoginRequestInterface } from "../../types/loginRequest.interface";

@Injectable()
export class AuthService{
    apiUrl = 'https://conduit.productionready.io/api'

    constructor(private http: HttpClient){

    }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
        const url = this.apiUrl + '/users';

        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser));
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
        const url = this.apiUrl + '/users/login';

        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser));
    }

    getUser(response: AuthResponseInterface): CurrentUserInterface{
        return response.user;
    }
}