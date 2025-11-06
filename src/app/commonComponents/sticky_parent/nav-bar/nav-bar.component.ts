import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { filter } from 'rxjs/operators';
import { CustomEvents } from '../../../services/customEvents';
import { BasicEj } from '../../basic-ej.modules';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [BasicEj, CommonModule]
})
export class NavBarComponent implements OnInit {
    public childName: string = "";
    public navigationTree: string[] = [];
    public breadcrumbMap: { [key: string]: { childName: string; navigationTree: string[] } } = {
        'dashboard': { childName: 'Dashboard', navigationTree: [] },
        'requirement': { childName: 'Requirement', navigationTree: [] },
        'library': { childName: 'Library', navigationTree: [] },
        'white-board': { childName: 'White Board', navigationTree: [] },
        'setting': { childName: 'Setting', navigationTree: [] }
    };

    constructor(private router: Router, private customEvent: CustomEvents) {
    }

    ngOnInit(): void {
        this.updateBreadcrumbs(this.router.url);
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.updateBreadcrumbs(event.urlAfterRedirects);
            }
        });
    }

    private updateBreadcrumbs(url: string): void {
        const urlSegments = url.split('/').filter(segment => segment);
        for (const segment of urlSegments) {
            if (this.breadcrumbMap[segment]) {
                this.childName = this.breadcrumbMap[segment].childName;
                this.navigationTree = this.breadcrumbMap[segment].navigationTree;
                break;
            }
        }
    }

    bgEvent(eve: BreadcrumbClickEventArgs) {
        switch (eve.item.text?.toLowerCase()) {
            //case ("home"): {
            //    this.router.navigate(['/tickets-list/']);
            //    return;
            //}
            //case ("tickets"): {
            //    this.router.navigate(['/tickets-list/']);
            //    return;
            //}
            //case ("reps"): {
            //    this.router.navigate(['/reps-list/']);
            //    return;
            //}
            //case ("insite"): {
                //this.router.navigate(['/tickets-list/value']);
                //return;
            //}
            default: {
                //this.router.navigate(['/tickets-list/name/' + this.currentUserInfo?.Name]);
                return;
            }
        }
    }
}
