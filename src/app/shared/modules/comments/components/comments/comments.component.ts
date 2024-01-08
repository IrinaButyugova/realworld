import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { CommentInputInterface } from "../../types/commentInput.interface";
import { createCommentAction } from "../../store/actions/createComment.action";
import { currentUserSelector, isLoggedInSelector } from "../../../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../../types/currentUser.interface";

@Component({
    selector: 'rw-comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit{
    @Input('slug') slugProps!: string;

    isLoggedIn$!: Observable<boolean>;
    currentUser$!: Observable<CurrentUserInterface | null>;
    comment: string = '';

    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.initializeValues();
    }

    initializeValues() {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
        this.currentUser$ = this.store.pipe(select(currentUserSelector));
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