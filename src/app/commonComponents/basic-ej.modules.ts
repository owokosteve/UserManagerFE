import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule, MultiSelectModule, CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import {
    SwitchModule,
    RadioButtonModule,
    CheckBoxModule,
    ButtonModule,
    ChipListModule,
    FabModule,
    SpeedDialModule
} from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
    BreadcrumbModule,
    SidebarModule,
    TabModule,
    TreeViewModule
} from '@syncfusion/ej2-angular-navigations';

import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ToastModule, MessageModule } from '@syncfusion/ej2-angular-notifications';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import {ProgressButtonModule} from "@syncfusion/ej2-angular-splitbuttons";

@NgModule({
    imports: [
        CommonModule,
        DatePickerModule, DateRangePickerModule,
        DropDownListModule, MultiSelectModule,
        SwitchModule, RadioButtonModule, CheckBoxModule, ButtonModule, ChipListModule, FabModule, SpeedDialModule,ProgressButtonModule,
        NumericTextBoxModule, TextBoxModule,
        BreadcrumbModule, SidebarModule, TabModule, TreeViewModule,
        DialogModule, TooltipModule,
        ToastModule, MessageModule,
        ListViewModule,
    ],
    exports: [
        DatePickerModule, DateRangePickerModule,
        DropDownListModule, MultiSelectModule,
        SwitchModule, RadioButtonModule, CheckBoxModule, ButtonModule, ChipListModule, FabModule,SpeedDialModule, ProgressButtonModule,
        NumericTextBoxModule, TextBoxModule,
        BreadcrumbModule, SidebarModule, TabModule, TreeViewModule,
        DialogModule, TooltipModule,
        ToastModule, MessageModule,
        ListViewModule,
    ],
    providers: [
        CheckBoxSelectionService,

    ],
})
export class BasicEj{}