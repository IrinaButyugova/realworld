import { ProfileInterface } from "../../../types/profile.interface";

export interface CommentInterface{
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: ProfileInterface
}