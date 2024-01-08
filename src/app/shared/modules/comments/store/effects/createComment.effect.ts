import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { CommentsService } from "../../services/comments.service";
import { CommentInterface } from "../../types/comment.interface";
import { 
    createCommentAction, 
    createCommentSuccessAction, 
    createCommentFailureAction } from "../actions/createComment.action";

@Injectable()
export class CreateCommentEffect {
    createComment$ = createEffect(() =>
    this.actions$.pipe(
        ofType(createCommentAction),
        switchMap(({slug, commentInput}) => {
            return this.commentsService.createComment(slug, commentInput).pipe(
                map((comment: CommentInterface) => {
                    return createCommentSuccessAction({comment});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(createCommentFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private commentsService: CommentsService){
        
    }
}