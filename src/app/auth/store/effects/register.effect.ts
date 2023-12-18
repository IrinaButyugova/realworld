import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { AuthService } from "../services/auth.service";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.actions";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() =>
    this.actions$.pipe(
        ofType(registerAction),
        switchMap(({request}) => {
            return this.authServce.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                   return registerSuccessAction({currentUser})
                }),
                catchError(() => {
                    return of(registerFailureAction())
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, private authServce: AuthService){
        
    }
}