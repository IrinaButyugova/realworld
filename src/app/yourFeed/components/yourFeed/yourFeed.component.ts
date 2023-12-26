import { Component } from "@angular/core";

@Component({
    selector: 'rw-yourFeed',
    templateUrl: './yourFeed.component.html',
    styleUrls: ['./yourFeed.component.scss']
})
export class YourFeedComponent{
   
    apiUrl = '/articles/feed'
}