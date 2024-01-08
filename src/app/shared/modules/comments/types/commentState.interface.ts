import { CommentInterface } from "./comment.interface"

export interface CommentStateInterface{
    isSubmitting: boolean;
    isLoading: boolean;
    data: CommentInterface[] | null;
    newComment: CommentInterface | null; 
}