import { Component } from '@angular/core';

@Component({
    selector: 'app-maintenance',
    standalone: true,
    template: `
        <div class="maintenance-container">
            <div class="content">
                <p class="font-24">System is under maintenance</p>
                <p class="font-20">We are working to bring the site up soon!</p>
            </div>
        </div>
    `,
    styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent {}