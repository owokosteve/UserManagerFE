import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.html',
  styleUrls: ['./library.css'],
  standalone: false,
})
export class LibraryComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.searchFullLibray("");
  }

  //view panel
  public availableSummary: string[] = ["abdul", "sadniya", "sugany", "kalam", "felix", "duglus"];
  public cssClass: string = 'custom-drop';
  public viewResult: string[] = [];
  public selectedInsightKey: string = "";
  treeView(eve: any) {
    this.selectedInsightKey = eve.data as string;
  }
  searchFullLibray(userInput: string) {
    if (userInput.trim() === "") {
      this.viewResult = [...this.availableSummary];
    } else {
      this.viewResult = this.availableSummary.filter(cat => cat.toLowerCase().includes(userInput.toLowerCase()));
    }
  }

  searchSelectedLibrary(userInput: string) {

  }
}
