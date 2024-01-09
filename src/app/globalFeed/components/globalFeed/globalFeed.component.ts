import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { FeedComponent } from "../../../shared/modules/feed/components/feed/feed.component";
import { BannerComponent } from "../../../shared/modules/banner/components/banner/banner.component";
import { PopularTagsComponent } from "../../../shared/modules/popularTags/components/popularTags/popularTags.component";
import { FeedTogglerComponent } from "../../../shared/modules/feedToggler/components/feedToggler/feedToggler.component";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        FeedComponent, 
        BannerComponent, 
        PopularTagsComponent,
        FeedTogglerComponent
    ],
    selector: 'rw-globalFeed',
    templateUrl: './globalFeed.component.html',
    styleUrls: ['./globalFeed.component.scss']
})
export class GlobalFeedComponent{
   
    apiUrl = '/articles'
}