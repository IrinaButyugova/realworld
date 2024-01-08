import { CommentInterface } from "./comment.interface"

export interface CommentsStateInterface{
    isSubmitting: boolean;
    isLoading: boolean;
    data: CommentInterface[];
}