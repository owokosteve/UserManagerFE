import { Component, signal } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('NsDocs');
}
