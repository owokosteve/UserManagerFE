import { Component } from '@angular/core';

@Component({
  selector: 'app-setting',
  standalone: false,
  templateUrl: './setting.html',
  styleUrl: './setting.scss'
})
export class Setting {
  themes: string[] = ['Light', 'Dark', 'System Default'];
  roles: string[] = ['Admin', 'Supervisor', 'User', 'Guest'];
}
