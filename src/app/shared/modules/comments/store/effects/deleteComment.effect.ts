import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { CommentsService } from "../../services/comments.service";
import { deleteCommentAction, deleteCommentFailureAction, deleteCommentSuccessAction } from "../actions/deleteAction.action";

@Injectable()
export class DeleteCommentEffect {
    deleteComment$ = createEffect(() =>
    this.actions$.pipe(
        ofType(deleteCommentAction),
        switchMap(({slug, id}) => {
            return this.commentsService.deleteComment(slug, id).pipe(
                map(() => {
                    return deleteCommentSuccessAction({id});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(deleteCommentFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private commentsService: CommentsService){
        
    }
}