import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {EMPTY, fromEvent, Observable, tap, throwError} from "rxjs";
import {Constants} from "../constants/constants";
import {catchError, takeUntil} from "rxjs/operators";
import {ToastType, ControllerName} from "../models/enums";
import {DictPar} from "../models/interface";
import {CustomToast} from "./toast";
import {CustomEvents} from "./customEvents";

@Injectable({
  providedIn: 'root'
})
export class ApiCallService  {
  public baseUrl = Constants.baseUrl;

    constructor(private http: HttpClient, private ct: CustomToast) {
        
    }

    public post<T>(controller: ControllerName, url: string, addUserData: boolean, data: any, additionalHeaders : DictPar[] = [], signalController: AbortController|null = null): Observable<any> {
        const headers: HttpHeaders = this.GenerateHeader(addUserData, additionalHeaders);
        if (signalController == null) {
            signalController = new AbortController();
        }
        return this.http.post(this.getUrl(controller, url), data, {headers: headers}).pipe(
            takeUntil(signalController ? fromEvent(signalController.signal, 'abort') : EMPTY),
            catchError(this.handleError.bind(this))
        );
    }

    public get<T>(controller: ControllerName, url: string, addUserData: boolean, urlParameter: DictPar[] = [], additionalHeaders : DictPar[] = []): Observable<any> {
        const headers: HttpHeaders = this.GenerateHeader(addUserData, additionalHeaders);
        return this.http.get(this.getUrl(controller, url, urlParameter), {headers: headers}).pipe(            
            catchError(this.handleError.bind(this))
        );
    }
    
    public DownloadFile(controller: ControllerName, url: string, addUserData: boolean, urlParameter: DictPar[] = [], additionalHeaders : DictPar[] = [], fileName: string): Observable<any> {
        const headers: HttpHeaders = this.GenerateHeader(addUserData, additionalHeaders);
        return this.http.get(this.getUrl(controller, url, urlParameter), {headers: headers, responseType : "blob" as 'json'}).pipe(
            tap((response: any) => {
                const blob = new Blob([response]);
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(url);
            }),
            catchError(this.handleError.bind(this))
        );
    }

    public GenerateHeader(addUserDetails: boolean = false, additionalHeaders : DictPar[] = []): HttpHeaders {
        // remember to check the custom interceptor for additional headers
        let headers: HttpHeaders = new HttpHeaders();
        //if (addUserDetails && this.user != null) {
        //    headers = this.AddHeader(headers, 'UserMail', this.user.Email);
        //}
        if(additionalHeaders.length > 0){
            additionalHeaders.forEach(
                (header: DictPar) => {
                    headers = this.AddHeader(headers, header.Key, header.Value);
                }
            )
        }
        return headers;
    }

    public AddHeader(headers: HttpHeaders, name: string, value: string): HttpHeaders {
        return headers.set(name, value);
    }

    public getUrl( controller: ControllerName, endPoint: string, urlParameters:DictPar[] = []): string {
        let basePath = this.baseUrl + controller + '/' + endPoint;
        if (urlParameters.length > 0) {
            basePath += '?';
            basePath += urlParameters
                .map((urlParameter: DictPar) => `${urlParameter.Key}=${urlParameter.Value}`)
                .join('&');
        }
        return basePath;
    }

    // Error handling
    private handleError(error: any): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            this.ct.showToast(ToastType.Error, 'An error occurred:' + error.error.message, 0, true);
        } else {
            // Server-side error handling
            switch (error.status) {
                case 400:
                    this.ct.showToast(ToastType.Error, `Bad Request: ${error.error}`, 4000, true);
                    break;
                case 401:
                    this.ct.showToast(ToastType.Error, `Unauthorized: ${error.error}`, 4000, true);
                    break;
                case 403:
                    this.ct.showToast(ToastType.Error, `Forbidden: ${error.error}`, 4000, true);
                    break;
                case 404:
                    this.ct.showToast(ToastType.Error, `Not Found: ${error.error}`, 4000, true);
                    break;
                case 500:
                    this.ct.showToast(ToastType.Error, `Internal Server Error: ${error.error}`, 4000, true);
                    break;
                case 503:
                    this.ct.showToast(ToastType.Error, `Service Unavailable: ${error.error}`, 4000, true);
                    break;
                default:
                    this.ct.showToast(ToastType.Error, `Unexpected Error (Code: ${error.status}): ${error.error}`, 4000, true);
                    break;
            }
        }
         return throwError('error');
    }

}
