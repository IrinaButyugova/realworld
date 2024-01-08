import { FeedStateInterface } from "../modules/feed/types/feedState.interface";
import { AuthStateInterface } from "../../auth/types/authState.interface";
import { PopularTagsStateInterface } from "../modules/popularTags/types/popularTags.interface";
import { ArticleStateInterface } from "../../article/types/articleState.interface";
import { CreateArticleStateInterface } from "../../createArticle/types/createArticleState.interface";
import { EditArticleStateInterface } from "../../editArticle/types/editArticleState.interface";
import { SettingsStateInterface } from "../../settings/types/settingsState.interface";
import { UserProfileStateInterface } from "../../userProfile/types/userProfile.state.interface";
import { CommentsStateInterface } from "../modules/comments/types/commentsState.interface";

export interface AppStateInterface{
    auth: AuthStateInterface,
    feed: FeedStateInterface,
    popularTags: PopularTagsStateInterface,
    article: ArticleStateInterface,
    createArticle: CreateArticleStateInterface,
    editArticle: EditArticleStateInterface,
    settings: SettingsStateInterface,
    userProfile: UserProfileStateInterface,
    comments: CommentsStateInterface
}