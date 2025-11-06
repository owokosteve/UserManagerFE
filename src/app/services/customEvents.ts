import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomEvents {
    private _scrollSource :BehaviorSubject<any> = new BehaviorSubject<any>(null);
    scroll$: Observable<any> = this._scrollSource.asObservable();
    
    private  _scrollEndSource:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    scrollEnd$: Observable<any> = this._scrollEndSource.asObservable();

    private  _windowResizeSource:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    resize$: Observable<any> = this._windowResizeSource.asObservable();

    private  _isMobileSource:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isMobile$: Observable<boolean> = this._isMobileSource.asObservable();    
    

    emitScroll(event: any):void {
        this._scrollSource.next(event);
    }
    
    emitScrollEnd(event: any): void{
        this._scrollEndSource.next(event);
    }
    
    emitResize(event: any):void{
        this._windowResizeSource.next(event);
    }
    
    emitIsMobile(isMobile: boolean){
        this._isMobileSource.next(isMobile);
    }
}

