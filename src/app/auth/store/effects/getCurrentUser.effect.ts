import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../services/auth.service";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { PersistanceService } from "../../../shared/services/persistance.service";
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "../actions/getCurrentUser.action";

@Injectable()
export class GetCurrentUserEffect {
    getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
            const token = this.persistaceService.get('accessToken');
            if(!token){
                return of(getCurrentUserFailureAction());
            }
            return this.authServce.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface) => {
                    return getCurrentUserSuccessAction({currentUser});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getCurrentUserFailureAction());
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