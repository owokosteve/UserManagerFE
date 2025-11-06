import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {
  NavigationEnd,
  Router
} from "@angular/router";
import { CustomEvents } from "../../../services/customEvents";

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrl: './top-panel.component.scss',
  standalone: false,
})
export class TopPanelComponent {
  public isMobile: boolean = false;
  
  constructor(private router: Router, private customEvent: CustomEvents) {}

  ngOnInit(): void {
    this.customEvent.resize$.pipe().subscribe(event => {
      //this.isMobile = this.cl.isWidthSmall(1000);
    });
  }
}
