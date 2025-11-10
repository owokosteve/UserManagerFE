import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CustomToast } from '../../services/toast';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent implements AfterViewInit {
  @ViewChild('toastRef', {static: false}) toastObj!: ToastComponent;

  constructor(private customToast: CustomToast){}

  ngAfterViewInit(): void {
    this.customToast.setToast(this.toastObj);
  }

}
