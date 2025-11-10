import { APP_INITIALIZER, NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './commonComponents/app-routing.module';
import { App } from './app';
import { BasicEj } from './commonComponents/basic-ej.modules';

import { CustomCssService } from './services/customCss';
import { NavMenuComponent } from './commonComponents/nav-menu/nav-menu.component';
import { StickyView } from './commonComponents/sticky_parent/sticky-parent.module';
import { ApiCallService } from './services/apiCall';
import { CustomEvents } from './services/customEvents';
import { CustomToast } from './services/toast';
import { RolePipe } from './services/roleService';
import { HttpClientModule } from '@angular/common/http';
import { ToastContainerComponent } from './commonComponents/toast_container/toast-container.component';
export function initCustomCss(customCssService: CustomCssService) {
  return () => customCssService.create();
}

@NgModule({
  declarations: [
    App,
    ToastContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BasicEj,
    NavMenuComponent,
    StickyView,   
  ],
  providers: [
    //{
    //  provide: APP_INITIALIZER,
    //  useFactory: initCustomCss,
    //  deps: [CustomCssService],
    //  multi: true
    //},
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    ApiCallService, CustomEvents, CustomToast, RolePipe

  ],
  bootstrap: [App]
})
export class AppModule { }
