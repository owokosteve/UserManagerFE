import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.html',
  styleUrls: ['./requirement.css'],
  standalone: false,
})
export class RequirementComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    console.log('Requirement component initialized');
  }
}
