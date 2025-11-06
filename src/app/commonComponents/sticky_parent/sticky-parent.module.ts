import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BasicEj } from '../../commonComponents/basic-ej.modules';
import {FormsModule} from "@angular/forms";
@NgModule({
    declarations: [
        TopPanelComponent,
    ],
    imports: [
        CommonModule,
        BasicEj,
        FormsModule,
        NavBarComponent,
    ],
    exports: [
        TopPanelComponent,
    ]
})
export class StickyView{}
