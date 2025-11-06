import { Component, Input, SimpleChanges } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { NavUI } from '../../models/interface';
import {filter} from "rxjs/operators";
import {RolePipe} from "../../services/roleService";
import { BasicEj } from '../basic-ej.modules';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
  standalone: true,
  imports: [BasicEj, CommonModule]
})
export class NavMenuComponent {
    public navMenus: NavUI[] = [
        { Name: 'Dashboard', IconClass: 'e-home', RedirectLink: 'dashboard', IsActive: false, CanBeActive: true, ActivationFragment: ['dashboard'] },
        { Name: 'Requirement', IconClass: 'e-description', RedirectLink: 'requirement', IsActive: false, CanBeActive: true, ActivationFragment: ['requirement'] },
        { Name: 'Library', IconClass: 'e-folder', RedirectLink: 'library', IsActive: false, CanBeActive: true, ActivationFragment: ['library'] },
        { Name: 'White Board', IconClass: 'e-edit', RedirectLink: 'white-board', IsActive: false, CanBeActive: true, ActivationFragment: ['white-board'] },
        { Name: 'Setting', IconClass: 'e-settings', RedirectLink: 'setting', IsActive: false, CanBeActive: true, ActivationFragment: ['setting'] }
    ];

    ngOnInit(): void {
        //this.getAdvancedMenu();        
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            if (event instanceof NavigationEnd){
                this.makeRouteActive(event.urlAfterRedirects);
            }
        });
    }

    constructor(private router: Router, private rl: RolePipe) {
        
    }

    navigateTo(route: string) {
        if (route != '') {
            this.router.navigate(['/' + route]);
        }
    }

    //getAdvancedMenu() {
    //    if (this.rl.transform("View_AdminPage")) {
    //        const adminPanel: NavUI = { Name: 'Admin panel', IconClass: 'sf-icon-user-admin', RedirectLink: 'adminpanel', IsActive: false,CanBeActive: true, ActivationFragment: ['adminpanel'] };
    //        const settingIndex = this.navMenus.findIndex(item => item.Name === 'Setting');
    //        const generatorPanel: NavUI = { Name: 'Insight generator', IconClass: 'e-icons e-grand-total', RedirectLink: 'generate-insight', IsActive: false,CanBeActive: true, ActivationFragment: ['generate-insight'] };

    //        if (settingIndex !== -1) {
    //            this.navMenus.splice(settingIndex, 0, adminPanel);
    //            this.navMenus.splice(settingIndex, 0, generatorPanel);
    //        } else {
    //            this.navMenus.push(adminPanel);
    //            this.navMenus.push(generatorPanel);
    //        }
    //    }
    //    this.makeRouteActive(this.router.url);
    //}
    
    stayDefault(event: Event){
        event.preventDefault();
    }

    makeRouteActive(url: string) {
        const urlSegments = url.split('/').filter(segment => segment);
        this.navMenus.forEach(menu => {
            menu.IsActive = false;
        });
        for (const menu of this.navMenus) {
            if (menu.CanBeActive && menu.ActivationFragment.some(fragment => urlSegments.includes(fragment))) {
                menu.IsActive = true;
                break;
            }
        }
    }
}
