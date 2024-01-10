
import { Component } from "@angular/core";

import { FeedComponent } from "../../../shared/modules/feed/components/feed/feed.component";
import { BannerComponent } from "../../../shared/modules/banner/components/banner/banner.component";
import { PopularTagsComponent } from "../../../shared/modules/popularTags/components/popularTags/popularTags.component";
import { FeedTogglerComponent } from "../../../shared/modules/feedToggler/components/feedToggler/feedToggler.component";

@Component({
    standalone: true,
    imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent
],
    selector: 'rw-yourFeed',
    templateUrl: './yourFeed.component.html',
    styleUrls: ['./yourFeed.component.scss']
})
export class YourFeedComponent{
   
    apiUrl = '/articles/feed'
}