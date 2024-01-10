import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, inject } from "@angular/core";

@Injectable()
export class PersistanceService{
    platformId = inject(PLATFORM_ID);
    
    set(key: string, data: any): void{
        try{
            if(isPlatformBrowser(this.platformId)){
                localStorage.setItem(key, data);
            }
        }
        catch(e){
            console.error('Error saving to localStorage', e);
        }
    }

    get(key: string): any{
        try{
            if(isPlatformBrowser(this.platformId)){
                var item = localStorage.getItem(key)
                if(item){
                    return item;
                }
            }
            return null;
        }
        catch(e){
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }
}