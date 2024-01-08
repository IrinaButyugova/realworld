import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { CommentsService } from "../../services/comments.service";
import { CommentInterface } from "../../types/comment.interface";
import { getCommentsAction, getCommentsFailureAction, getCommentsSuccessAction } from "../actions/getComments.action";

@Injectable()
export class GetCommentsEffect {
    getComments$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getCommentsAction),
        switchMap(({slug}) => {
            return this.commentsService.getComments(slug).pipe(
                map((comments: CommentInterface[]) => {
                    return getCommentsSuccessAction({comments});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getCommentsFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private commentsService: CommentsService){
        
    }
}