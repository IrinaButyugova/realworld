import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProfileInterface } from "../types/profile.interface";
import { environment } from "../../../environments/environment";
import { GetProfileResponseInterface } from "../types/getProfileResponse.interface";

@Injectable()
export class FollowService{
    constructor(private http: HttpClient){

    }

    follow(username: string): Observable<ProfileInterface>{
        const url = this.getUrl(username);
        return this.http.post<GetProfileResponseInterface>(url, {})
        .pipe(map(this.getProfile));
    }

    unfollow(username: string): Observable<ProfileInterface>{
        const url = this.getUrl(username);
        return this.http.delete<GetProfileResponseInterface>(url, {})
        .pipe(map(this.getProfile));
    }

    getUrl(username: string): string {
        return `${environment.apiUrl}/profiles/${username}/follow`;
    }

    getProfile(response: GetProfileResponseInterface): ProfileInterface{
        return response.profile;
    }
}