import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { GlobalFeedComponent } from "./components/globalFeed/globalFeed.component";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { BannerModule } from "../shared/modules/banner/banner.module";
import { PopularTagsModule } from "../shared/modules/popularTags/popularTags.module";
import { FeedTogglerModule } from "../shared/modules/feedToggler/feedToggler.module";

@NgModule({
    imports: [
        CommonModule, 
        FeedModule, 
        BannerModule, 
        PopularTagsModule,
        FeedTogglerModule
    ],
    declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule{
    
}