import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { ApiEndpoint, Parameter } from '../../../models/interface';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css'],
  standalone: false
})
export class ApisComponent implements OnInit {
  apiEndpoints: ApiEndpoint[] = [];
  filteredEndpoints: ApiEndpoint[] = [];
  isLoading: boolean = true;
  error: string = '';
  searchTerm: string = '';
  selectedController: string = 'all';

  controllers: string[] = [''];
  public filterType: string = "Contains";

  constructor(private docService: DocumentationService) { }

  ngOnInit(): void {
    this.loadApiEndpoints();
  }

  private loadApiEndpoints(): void {
    this.docService.getApiEndpoints().subscribe({
      next: (endpoints) => {
        this.apiEndpoints = endpoints;
        this.filteredEndpoints = endpoints;
        this.controllers = ['all', ...new Set(endpoints.map(e => e.controller))];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load API endpoints';
        this.isLoading = false;
        console.error('Error loading API endpoints:', err);
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filterEndpoints();
  }

  onControllerChange(controller: string): void {
    this.selectedController = controller;
    this.filterEndpoints();
  }

  onControllerSelect(event: any): void {
    this.selectedController = event.itemData;
    this.filterEndpoints();
  }

  private filterEndpoints(): void {
    let filtered = this.apiEndpoints;

    if (this.selectedController !== 'all') {
      filtered = filtered.filter(e => e.controller === this.selectedController);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(e => 
        e.method.toLowerCase().includes(term) ||
        e.route.toLowerCase().includes(term) ||
        e.controller.toLowerCase().includes(term) ||
        e.httpMethod.toLowerCase().includes(term)
      );
    }

    this.filteredEndpoints = filtered;
  }

  getHttpMethodClass(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET': return 'method-get';
      case 'POST': return 'method-post';
      case 'PUT': return 'method-put';
      case 'DELETE': return 'method-delete';
      case 'PATCH': return 'method-patch';
      default: return 'method-default';
    }
  }
}
