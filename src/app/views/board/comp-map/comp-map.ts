import { Component } from '@angular/core';

@Component({
  selector: 'app-comp-map',
  standalone: false,
  templateUrl: './comp-map.html',
  styleUrl: './comp-map.css'
})
export class CompMap {
  viewResult = [
    "one", "tow", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
  ];
  listSelect(e: any ) {

  }
}
