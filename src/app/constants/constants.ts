import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class Constants {
    public static readonly Environment = environment;
    public static  readonly DateSeparator: string = "|||";
    public static readonly baseUrl: string = environment.PortNumber + '/api/v1/';
    
    //npm run generate:component api-reference --skip-import :: location-->D:\AIInSite\ClientApp
    //#FF667085 color of icon
    //#8290A4 fade icon color
}
