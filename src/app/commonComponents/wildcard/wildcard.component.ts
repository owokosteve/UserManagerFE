import {Component, Input,} from '@angular/core';
import {Router} from "@angular/router";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-wildcard',
    standalone: true,
    template: `
        <div class="flex h-100 wd-100 flex-align-center justify">
            <div class="box-sizing border p16 flex flex-horizontal">
                <div class="border-right p16 box-sizing flex flex-align-center">
                    <p class="font-60 font-500">
                        {{ errorCode }}
                    </p>
                </div>
                <div class="border-left flex-vertical p16 box-sizing g8">
                    <p class="font-20 font-500"> Sorry!</p>
                    <p class="font-15 font-400"> {{ errorMessage }}</p>
                    <button ejs-button class="" (click)="buttonClick()" *ngIf="showButton">Go Home</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
      .font-60 {
        font-size: 60px;
      }
    `],

    imports: [
      ButtonModule,
      CommonModule
    ]
})
export class WildcardComponent {
    @Input() errorCode: string = '404!';
    @Input() errorMessage: string = 'Requested page not found!';
    @Input() navigationLink: string = '';
    @Input() showButton: boolean = true;
    constructor(protected router: Router) {
        
    }
    buttonClick(){
        this.router.navigate([this.navigationLink]);
    }
}
