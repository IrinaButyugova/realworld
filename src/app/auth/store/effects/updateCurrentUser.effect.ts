import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../services/auth.service";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction } from "../actions/updateCurrentUser.action";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { PersistanceService } from "../../../shared/services/persistance.service";

@Injectable()
export class UpdateCurrentUserEffect {
    updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(updateCurrentUserAction),
        switchMap(({currentUserInput}) => {
            return this.authServce.updateCurrentUser(currentUserInput).pipe(
                map((currentUser: CurrentUserInterface) => {
                    this.persistaceService.set('accessToken', currentUser.token);
                    return updateCurrentUserSuccessAction({currentUser});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    const backendErrors : BackendErrorsInterface = { 
                        'error': [errorResponse.error]
                      };
                      return of(updateCurrentUserFailureAction({errors: backendErrors}));
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private authServce: AuthService,
        private persistaceService: PersistanceService){
        
    }
}