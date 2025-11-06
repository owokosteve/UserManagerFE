// setting-module.ts
// Module definition for the Setting feature

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Setting } from './setting';
import { RouterModule } from '@angular/router';
import { BasicEj } from "../../commonComponents/basic-ej.modules";
import { EjSearchComponent } from "../../commonComponents/ej-search/ej-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyProfile } from './my-profile/my-profile';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  declarations: [
    Setting,
    MyProfile
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: Setting },
    ]),
    BasicEj,
    EjSearchComponent,
    FormsModule,
    ReactiveFormsModule,
    DialogAllModule
],
  exports: [
    Setting
  ]
})
export class SettingModule { }
