import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProfileInterface } from "../../../types/profile.interface";
import { environment } from "../../../../../environments/environment";

@Injectable()
export class FollowService{
    constructor(private http: HttpClient){

    }

    follow(username: string): Observable<ProfileInterface>{
        const url = this.getUrl(username);
        return this.http.post<ProfileInterface>(url, {});
    }

    unfollow(username: string): Observable<ProfileInterface>{
        const url = this.getUrl(username);
        return this.http.delete<ProfileInterface>(url, {});
    }

    getUrl(username: string): string {
        return `${environment.apiUrl}/profiles/${username}/follow`;
    }
}