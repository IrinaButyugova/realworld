import { Injectable } from "@angular/core";

@Injectable()
export class PersistanceService{
    set(key: string, data: any): void{
        try{
            localStorage.setItem(key, data);
        }
        catch(e){
            console.error('Error saving to localStorage', e);
        }
    }

    get(key: string): any{
        try{
            if (typeof localStorage !== 'undefined')
            {
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