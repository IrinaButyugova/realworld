import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { GlobalFeedComponent } from "./components/globalFeed/globalFeed.component";
import { FeedModule } from "../shared/modules/feed/feed.module";

@NgModule({
    imports: [CommonModule, FeedModule],
    declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule{
    
}