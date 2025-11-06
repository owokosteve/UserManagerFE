import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { ServiceMethod, MethodParameter } from '../../../models/interface';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css'],
  standalone: false
})
export class MethodsComponent implements OnInit {
  serviceMethods: ServiceMethod[] = [];
  filteredMethods: ServiceMethod[] = [];
  isLoading: boolean = true;
  error: string = '';
  searchTerm: string = '';
  selectedClass: string = 'all';
  selectedAccessibility: string = 'all';

  classes: string[] = [];
  accessibilityLevels: string[] = ['all', 'public', 'private', 'protected', 'internal'];
  public filterType: string = "Contains";

  constructor(private docService: DocumentationService) { }

  ngOnInit(): void {
    this.loadServiceMethods();
  }

  private loadServiceMethods(): void {
    this.docService.getServiceMethods().subscribe({
      next: (methods) => {
        this.serviceMethods = methods;
        this.filteredMethods = methods;
        this.classes = ['all', ...new Set(methods.map(m => m.className))];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load service methods';
        this.isLoading = false;
        console.error('Error loading service methods:', err);
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filterMethods();
  }

  onClassChange(className: string): void {
    this.selectedClass = className;
    this.filterMethods();
  }

  onAccessibilityChange(accessibility: string): void {
    this.selectedAccessibility = accessibility;
    this.filterMethods();
  }

  private filterMethods(): void {
    let filtered = this.serviceMethods;

    if (this.selectedClass !== 'all') {
      filtered = filtered.filter(m => m.className === this.selectedClass);
    }

    if (this.selectedAccessibility !== 'all') {
      filtered = filtered.filter(m => m.accessibility === this.selectedAccessibility);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.className.toLowerCase().includes(term) ||
        m.returnType.toLowerCase().includes(term) ||
        m.namespace.toLowerCase().includes(term)
      );
    }

    this.filteredMethods = filtered;
  }

  getAccessibilityClass(accessibility: string): string {
    switch (accessibility) {
      case 'public': return 'access-public';
      case 'private': return 'access-private';
      case 'protected': return 'access-protected';
      case 'internal': return 'access-internal';
      default: return 'access-default';
    }
  }

  getMethodSignature(method: ServiceMethod): string {
    const params = method.parameters.map(p => 
      `${p.name}: ${p.type}${p.isOptional ? '?' : ''}${p.defaultValue ? ` = ${p.defaultValue}` : ''}`
    ).join(', ');
    
    const modifiers = [];
    if (method.isStatic) modifiers.push('static');
    if (method.isAsync) modifiers.push('async');
    
    const modifierStr = modifiers.length > 0 ? modifiers.join(' ') + ' ' : '';
    
    return `${modifierStr}${method.name}(${params}): ${method.returnType}`;
  }
}
