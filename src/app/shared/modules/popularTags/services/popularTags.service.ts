import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PopularTagType } from "../../../types/popularTag.type";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";

@Injectable()
export class PopularTagsService{
    apiUrl = 'https://conduit.productionready.io/api';

    constructor(private http: HttpClient){

    }

    getPopularTags(): Observable<PopularTagType[]>{
        const url = this.apiUrl + '/tags';

        return this.http.get<GetPopularTagsResponseInterface>(url)
        .pipe(
            map((response: GetPopularTagsResponseInterface) => {
                return response.tags
            })
        );
    }
}