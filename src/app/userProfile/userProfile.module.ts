import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./components/userProfile/userProfile.component";
import { UserProfileService } from "./services/userProfile.service";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { RouterModule } from "@angular/router";
import { FollowModule } from "../shared/modules/follow/follow.module";

@NgModule({
    imports: [CommonModule, FeedModule, RouterModule, FollowModule],
    declarations: [UserProfileComponent],
    providers: [UserProfileService]
})
export class UserProfileModule{

}