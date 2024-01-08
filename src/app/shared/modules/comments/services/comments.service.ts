import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { CommentInterface } from "../types/comment.interface";
import { environment } from "../../../../../environments/environment";
import { SaveCommentResponseInterface } from "../types/saveCommentResponse.interface";
import { CommentInputInterface } from "../types/commentInput.interface";
import { CommentsResponseInterface } from "../types/commentsResponse.interface";

@Injectable()
export class CommentsService{
    constructor(private http: HttpClient){

    }

    createComment(slug: string, commentInput: CommentInputInterface): Observable<CommentInterface>{
        const fullUrl = this.getUrl(slug);

        return this.http.post<SaveCommentResponseInterface>(fullUrl, {comment: commentInput})
        .pipe(map((response: SaveCommentResponseInterface) => 
            response.comment
        ));
    }

    getComments(slug: string): Observable<CommentInterface[]>{
        const fullUrl = this.getUrl(slug);

        return this.http.get<CommentsResponseInterface>(fullUrl)
        .pipe(map((response: CommentsResponseInterface) => 
            response.comments
        ));
    }

    getUrl(slug: string): string{
        return `${environment.apiUrl}/articles/${slug}/comments`;
    }
}