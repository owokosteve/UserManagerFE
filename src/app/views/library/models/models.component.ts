import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { ServiceModel, ModelProperty } from '../../../models/interface';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css'],
  standalone: false
})
export class ModelsComponent implements OnInit {
  serviceModels: ServiceModel[] = [];
  filteredModels: ServiceModel[] = [];
  isLoading: boolean = true;
  error: string = '';
  searchTerm: string = '';
  selectedNamespace: string = 'all';
  selectedType: string = 'all';

  namespaces: string[] = [];
  modelTypes: string[] = ['all', 'class', 'interface', 'enum'];
  public filterType: string = "Contains";

  constructor(private docService: DocumentationService) { }

  ngOnInit(): void {
    this.loadServiceModels();
  }

  private loadServiceModels(): void {
    this.docService.getServiceModels().subscribe({
      next: (models) => {
        this.serviceModels = models;
        this.filteredModels = models;
        this.namespaces = ['all', ...new Set(models.map(m => m.namespace))];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load service models';
        this.isLoading = false;
        console.error('Error loading service models:', err);
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filterModels();
  }

  onNamespaceChange(namespace: string): void {
    this.selectedNamespace = namespace;
    this.filterModels();
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.filterModels();
  }

  onNamespaceSelect(event: any): void {
    this.selectedNamespace = event.itemData;
    this.filterModels();
  }

  onTypeSelect(event: any): void {
    this.selectedType = event.itemData;
    this.filterModels();
  }

  private filterModels(): void {
    let filtered = this.serviceModels;

    if (this.selectedNamespace !== 'all') {
      filtered = filtered.filter(m => m.namespace === this.selectedNamespace);
    }

    if (this.selectedType !== 'all') {
      filtered = filtered.filter(m => {
        switch (this.selectedType) {
          case 'class': return m.isClass;
          case 'interface': return m.isInterface;
          case 'enum': return m.isEnum;
          default: return true;
        }
      });
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.namespace.toLowerCase().includes(term) ||
        (m.description && m.description.toLowerCase().includes(term))
      );
    }

    this.filteredModels = filtered;
  }

  getModelTypeClass(model: ServiceModel): string {
    if (model.isClass) return 'model-class';
    if (model.isInterface) return 'model-interface';
    if (model.isEnum) return 'model-enum';
    return 'model-default';
  }

  getModelTypeName(model: ServiceModel): string {
    if (model.isClass) return 'Class';
    if (model.isInterface) return 'Interface';
    if (model.isEnum) return 'Enum';
    return 'Unknown';
  }

  getPropertyTypeClass(property: ModelProperty): string {
    const classes = [];
    if (property.isReadOnly) classes.push('readonly');
    if (property.isNullable) classes.push('nullable');
    return classes.join(' ');
  }

  getInheritanceDisplay(model: ServiceModel): string {
    if (!model.inheritance || model.inheritance.length === 0) {
      return '';
    }
    return model.inheritance.join(', ');
  }
}
