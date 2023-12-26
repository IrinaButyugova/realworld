import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { GetArticleResponseInterface } from "../types/getArticleResponseInterface";
import { ArticleInterface } from "../types/article.interface";

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient){

    }

    getArticle(slug: string): Observable<ArticleInterface>{
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;

        return this.http.get<GetArticleResponseInterface>(fullUrl)
        .pipe(map((response: GetArticleResponseInterface) => {
            return response.article;
        }));
    }
}