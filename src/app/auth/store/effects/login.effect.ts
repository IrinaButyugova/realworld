import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.actions";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { PersistanceService } from "../../../shared/services/persistance.service";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.actions";

@Injectable()
export class LoginEffect {
    register$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loginAction),
        switchMap(({request}) => {
            return this.authServce.login(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    this.persistaceService.set('accessToken', currentUser.token);
                    return loginSuccessAction({currentUser});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(loginFailureAction({errors: errorResponse.error.errors}));
                })
            )
        })
    )
    )

    redirectAfterSubmit$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/')
            })
        ),
        {
            dispatch: false
        }
    )

    constructor(private actions$: Actions, 
        private authServce: AuthService,
        private persistaceService: PersistanceService,
        private router: Router){
        
    }
}

