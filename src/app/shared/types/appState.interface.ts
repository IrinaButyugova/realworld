import { FeedStateInterface } from "../modules/feed/types/feedState.interface";
import { AuthStateInterface } from "../../auth/types/authState.interface";
import { PopularTagsStateInterface } from "../modules/popularTags/types/popularTags.interface";

export interface AppStateInterface{
    auth: AuthStateInterface,
    feed: FeedStateInterface,
    popularTags: PopularTagsStateInterface
}