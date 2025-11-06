import {Injectable} from "@angular/core";
import {ToastComponent} from "@syncfusion/ej2-angular-notifications";
import {ToastType} from "../models/enums";
import {ToastModel} from "@syncfusion/ej2-notifications/src/toast/toast-model";

@Injectable({
    providedIn: 'root',
})
export class CustomToast {
    private toastElement!: ToastComponent;
    constructor() {

    }

    setToast(ele: ToastComponent) {
        this.toastElement = ele;
    }

    showToast(type: ToastType, value: string, timeOut: number = 1500, showCloseButton: boolean = false) {
        if(this.toastElement) {
            this.toastElement.show(this.generateToast(type, value, timeOut, showCloseButton));
        }
    }

    generateToast(type: ToastType, value: string, timeOut: number = 1500, showCloseButton: boolean = false): ToastModel  {
        const toastConfig = {
            [ToastType.Success]: { title: ToastType.Success, cssClass: 'e-toast-success', icon: 'e-toast-success-icon' },
            [ToastType.Warning]: { title: ToastType.Warning, cssClass: 'e-toast-warning', icon: 'e-toast-warning-icon' },
            [ToastType.Error]: { title: ToastType.Error, cssClass: 'e-toast-danger', icon: 'e-toast-error-icon' },
            [ToastType.Information]: { title: ToastType.Information, cssClass: 'e-toast-info', icon: 'e-toast-info-icon' },
            default: { title: 'Unknown!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-toast-success-icon' }
        };

        const config = toastConfig[type] || toastConfig.default;
        return { ...config, content: value, timeOut: timeOut, showCloseButton: showCloseButton };
    }
}