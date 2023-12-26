import { FeedStateInterface } from "../modules/feed/types/feedState.interface";
import { AuthStateInterface } from "../../auth/types/authState.interface";
import { PopularTagsStateInterface } from "../modules/popularTags/types/popularTags.interface";
import { ArticleStateInterface } from "../../article/types/articleState.interface";

export interface AppStateInterface{
    auth: AuthStateInterface,
    feed: FeedStateInterface,
    popularTags: PopularTagsStateInterface,
    article: ArticleStateInterface
}