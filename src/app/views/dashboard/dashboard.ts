import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    console.log('Dashboard component initialized');
  }
}
