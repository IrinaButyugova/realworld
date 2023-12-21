import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { GlobalFeedComponent } from "./components/globalFeed/globalFeed.component";
import { FeedModule } from "../shared/modules/feed/feed.module";
import { BannerModule } from "../shared/modules/banner/banner.module";

@NgModule({
    imports: [CommonModule, FeedModule, BannerModule],
    declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule{
    
}