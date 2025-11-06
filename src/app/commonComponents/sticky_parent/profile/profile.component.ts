//import { Component, Inject, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
//import { Router } from '@angular/router';
//import { MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
//import { DeviceDetectorService } from 'ngx-device-detector';
//import { Subject } from 'rxjs';
//import {TicketInfo, UserBasicInfo} from '../../../models/interface';
//import { CommonUtilLibrary } from '../../../services/commonUtil';
//import { UserDataService } from '../../../services/userInfo';
//import { slideInAnimation } from '../../../constants/animations';
//import { TooltipComponent } from '@syncfusion/ej2-angular-popups';
//import {CustomEvents} from "../../../services/customEvents";
//import {end} from "@popperjs/core";
//import {EndSessionPopupRequest} from "@azure/msal-browser";
//import {Constants} from "../../../constants/constants";
//@Component({
//  selector: 'app-profile',
//  templateUrl: './profile.component.html',
//    styleUrls: ['./profile.component.scss'],
//    animations: [slideInAnimation],
//})
//export class ProfileComponent implements OnInit {
//    public isMobile: boolean = false;
//    public profileWidth: number = 250;
//    public currentUserInfo: UserBasicInfo | null = null;

//    //toottip
//    @ViewChild('profiletooltip')
//    public tooltipControl: TooltipComponent | any;
//    public tootWidth: string = '300px';
//    public class: string = "tryAgain profile-tooltip";

//    constructor(
//        private msalService: MsalService,
//        private customEvent: CustomEvents,
//        private router: Router,
//        private dataService: UserDataService,
//        private cl: CommonUtilLibrary
//    ) {
        
//    }

//    ngOnInit(): void {
//        this.customEvent.isMobile$.pipe().subscribe(event => {
//            this.isMobile = event;
//            if (this.isMobile) {
//                const maxWidth = this.cl.getEightyPercentScreenWidth();
//                this.profileWidth = maxWidth - 40;
//                this.tootWidth = maxWidth + 'px';
//            } 
//        });
//        this.customEvent.userInfo$.subscribe(userInfo => this.currentUserInfo = userInfo);

//        const broadcastChannel = new BroadcastChannel('logout-channel');
//        broadcastChannel.onmessage = (message) => {
//            if (message.data === 'logout') {
//                this.router.navigate(['/']);
//            }
//        };
//    }
//    ngOnDestroy(): void {
//        const broadcastChannel = new BroadcastChannel('logout-channel');
//        broadcastChannel.close();
//    }

//    logout() {
//        this.clearSessionData();
//        try {
//            const endSessionRequest: EndSessionPopupRequest = {
//                popupWindowAttributes: Constants.DialogProperties, 
//                mainWindowRedirectUri: '/' 
//            };

//            // Perform logout using popup
//            this.msalService.logoutPopup(endSessionRequest).subscribe({
//                next: () => {
//                    this.msalService.instance.setActiveAccount(null);
//                    const broadcastChannel = new BroadcastChannel('logout-channel');
//                    broadcastChannel.postMessage('logout');
//                    this.router.navigate(['/']);
//                },
//                error: (err) => {
//                    this.msalService.logoutRedirect({
//                        postLogoutRedirectUri: '/'
//                    });
//                }
//            });
//        } catch (error) {
//            this.msalService.logoutRedirect({
//                postLogoutRedirectUri: '/'
//            });
//        }
//    }


//    private clearSessionData() {
//        localStorage.clear();
//        sessionStorage.removeItem('XSRF-TOKEN');
//    }    

//    getUserDisplayName() {
//        const nameParts = (this.currentUserInfo?.Name as string)?.split(' ');
//        let returnArray: string = '';
//        if (nameParts.length === 1) {
//            returnArray = this.capitalizeFirstLetter(nameParts[0].charAt(0)) + this.capitalizeFirstLetter(nameParts[0].charAt(nameParts[0].length - 1));
//        } else {
//            nameParts.forEach((part) => {
//                if (returnArray.length < 2 && this.cl.IsNotNullOrUndefined(part)) {
//                    returnArray = returnArray + this.capitalizeFirstLetter(part);
//                }
//            });
//        }
//        return returnArray;
//    }

//    capitalizeFirstLetter(input: string): string {
//        return input.charAt(0).toUpperCase();
//    }

//    changeTheme() {
//        let parent: HTMLDivElement = document.getElementById("home-parent") as HTMLDivElement;
//        if (parent) {
//            const hasDarkTheme = parent.classList.contains('e-dark-mode');
//            this.currentUserInfo!.IsDarkTheme = !hasDarkTheme;
//            if (this.currentUserInfo!.IsDarkTheme) {
//                parent.classList.add('e-dark-mode');
//            } else {
//                parent.classList.remove('e-dark-mode');
//            }
//            this.dataService.updateUserTheme(this.currentUserInfo as UserBasicInfo);
//        }
//    }
//}
