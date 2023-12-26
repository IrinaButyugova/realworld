import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";

@Injectable()
export class FeedService {
    apiUrl = 'https://api.realworld.io/api'

    constructor(private http: HttpClient){

    }

    getFeed(url: string): Observable<GetFeedResponseInterface>{
        const fullUrl = this.apiUrl + url;

        return this.http.get<GetFeedResponseInterface>(fullUrl);
    }
}