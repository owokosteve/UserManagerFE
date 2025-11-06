import { CommonModule } from '@angular/common';
import {Component, ElementRef, EventEmitter, Output, Renderer2} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-ej-search',
  templateUrl: './ej-search.component.html',
  styleUrl: './ej-search.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EjSearchComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  //searchBox
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  public focusIn(target: any): void {
    target.parentElement.classList.add('e-input-focus');
    //this.sanitizeElement(target);
  }

  public focusOut(target: any): void {
    target.parentElement.classList.remove('e-input-focus');
    //this.sanitizeElement(target);
  }
  public input: string = "";
  // end search box

  search() {
    if (this.input.trim() === "") {
      this.searchValue.emit("");
    } else {
      this.searchValue.emit(this.input);
    }
  }
  clear(){
    this.input= "";
    this.searchValue.emit("");
  }
  
  //private sanitizeElement(element: HTMLElement): void {
  //  const sanitizedHtml = this.safePipe.transform(element.innerHTML, 'html', true);
  //  this.renderer.setProperty(element, 'innerHTML', sanitizedHtml);
  //}
}
