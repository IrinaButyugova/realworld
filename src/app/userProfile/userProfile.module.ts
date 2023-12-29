import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./components/userProfile/userProfile.component";
import { UserProfileService } from "./services/userProfile.service";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, FeedModule, RouterModule],
    declarations: [UserProfileComponent],
    providers: [UserProfileService]
})
export class UserProfileModule{

}