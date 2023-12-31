import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { AuthResponseInterface } from "../../types/authResponse.interface";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { environment } from "../../../../environments/environment";
import { CurrentUserInputInterface } from "../../../shared/types/currentUserInput.interface";

@Injectable()
export class AuthService{
    constructor(private http: HttpClient){

    }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/users';

        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser));
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/users/login';

        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser));
    }

    getCurrentUser(): Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/user';

        return this.http
        .get<AuthResponseInterface>(url)
        .pipe(map(this.getUser));
    }

    getUser(response: AuthResponseInterface): CurrentUserInterface{
        return response.user;
    }

    updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/user';

        return this.http
        .put<AuthResponseInterface>(url, {user: currentUserInput})
        .pipe(map(this.getUser));
    }
}