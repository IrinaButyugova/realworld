import { Component } from "@angular/core";

@Component({
    selector: 'rw-globalFeed',
    templateUrl: './globalFeed.component.html',
    styleUrls: ['./globalFeed.component.scss']
})
export class GlobalFeedComponent{
   
    apiUrl = '/articles'
}