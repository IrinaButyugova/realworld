import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

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
    selector: 'rw-tagFeed',
    templateUrl: './tagFeed.component.html',
    styleUrls: ['./tagFeed.component.scss']
})
export class TagFeedComponent implements OnInit{
    apiUrl!: string;
    tagName!: string | null;

    constructor(private route: ActivatedRoute){

    }

    ngOnInit(): void{
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['slug'];
            this.apiUrl = `/articles?tag=${this.tagName}`;
        })
    }
}