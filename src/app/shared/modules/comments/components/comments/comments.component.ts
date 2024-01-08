import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { CommentInputInterface } from "../../types/commentInput.interface";
import { createCommentAction } from "../../store/actions/createComment.action";
import { currentUserSelector, isLoggedInSelector } from "../../../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../../types/currentUser.interface";
import { CommentInterface } from "../../types/comment.interface";
import { commentsSelector } from "../../store/selectors";
import { getCommentsAction } from "../../store/actions/getComments.action";

@Component({
    selector: 'rw-comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit{
    @Input('slug') slugProps!: string;

    isLoggedIn$!: Observable<boolean>;
    currentUser$!: Observable<CurrentUserInterface | null>;
    comments$!: Observable<CommentInterface[]>;
    comment: string = '';

    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    fetchData() {
        this.store.dispatch(getCommentsAction({
            slug: this.slugProps
        }));
    }

    initializeValues() {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
        this.currentUser$ = this.store.pipe(select(currentUserSelector));
        this.comments$ = this.store.pipe(select(commentsSelector));
    }

    postComment(): void{
        const inputData: CommentInputInterface = {
            body: this.comment
        };
        this.store.dispatch(createCommentAction({
            slug: this.slugProps,
            commentInput: inputData}
        ));
    }

}