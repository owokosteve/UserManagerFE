import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControllerName } from "../models/enums";

// Import interfaces
import { 
  ApiEndpoint, 
  Parameter, 
  ServiceMethod, 
  MethodParameter, 
  ServiceModel, 
  ModelProperty,
  DictPar
} from '../models/interface';
import { ApiCallService } from './apiCall';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  public availabeServices: string[] = [];
  public selectedService: string = 'UserManager';


  constructor(private http: ApiCallService) { }

  setService(service: string[]) {
    this.availabeServices = service;
  }

  getService() {
    this.http.get<ApiEndpoint[]>(ControllerName.Documents, 'available', false).subscribe((data) => {
      this.setService(data as string[]);
    });
  }

  getSelectedService(): string {
    return this.selectedService;
  }

  setSelectedService(ss: string): void {
    this.selectedService = ss;
  }

  getApiEndpoints(): Observable<ApiEndpoint[]> {
    const param: DictPar[] = [{
      Key: "serviceName", Value: this.selectedService
    }]
    // For now, return mock data. In a real implementation, this would call your API
    return this.http.get<ApiEndpoint[]>(ControllerName.Documents, 'apis/' + this.selectedService, false);
    //return of(this.getMockApiEndpoints());
    
    // Real implementation would be:
    // return this.http.get<ApiEndpoint[]>(`${this.baseUrl}/documentation/endpoints`);
  }

  getServiceMethods(): Observable<ServiceMethod[]> {
    // For now, return mock data
    return this.http.get<ApiEndpoint[]>(ControllerName.Documents, 'interfaces', false);
    //return of(this.getMockServiceMethods());
    
    // Real implementation:
    // return this.http.get<ServiceMethod[]>(`${this.baseUrl}/documentation/methods`);
  }

  getServiceModels(): Observable<ServiceModel[]> {
    // For now, return mock data
    return this.http.get<ApiEndpoint[]>(ControllerName.Documents, 'models', false);
    //return of(this.getMockServiceModels());
    
    // Real implementation:
    // return this.http.get<ServiceModel[]>(`${this.baseUrl}/documentation/models`);
  }

  private getMockApiEndpoints(): ApiEndpoint[] {
    return [
      {
        controller: 'DiagramController',
        method: 'GetDiagrams',
        route: '/api/diagram',
        httpMethod: 'GET',
        parameters: [
          {
            name: 'page',
            type: 'int',
            isOptional: true,
            description: 'Page number for pagination',
            source: 'query'
          },
          {
            name: 'pageSize',
            type: 'int',
            isOptional: true,
            description: 'Number of items per page',
            source: 'query'
          }
        ],
        returnType: 'IEnumerable<Diagram>',
        description: 'Retrieves a list of diagrams with optional pagination'
      },
      {
        controller: 'DiagramController',
        method: 'GetDiagram',
        route: '/api/diagram/{id}',
        httpMethod: 'GET',
        parameters: [
          {
            name: 'id',
            type: 'int',
            isOptional: false,
            description: 'Unique identifier of the diagram',
            source: 'route'
          }
        ],
        returnType: 'Diagram',
        description: 'Retrieves a specific diagram by ID'
      },
      {
        controller: 'DiagramController',
        method: 'CreateDiagram',
        route: '/api/diagram',
        httpMethod: 'POST',
        parameters: [
          {
            name: 'diagram',
            type: 'CreateDiagramRequest',
            isOptional: false,
            description: 'Diagram data to create',
            source: 'body'
          }
        ],
        returnType: 'Diagram',
        description: 'Creates a new diagram'
      },
      {
        controller: 'DiagramController',
        method: 'UpdateDiagram',
        route: '/api/diagram/{id}',
        httpMethod: 'PUT',
        parameters: [
          {
            name: 'id',
            type: 'int',
            isOptional: false,
            description: 'ID of the diagram to update',
            source: 'route'
          },
          {
            name: 'diagram',
            type: 'UpdateDiagramRequest',
            isOptional: false,
            description: 'Updated diagram data',
            source: 'body'
          }
        ],
        returnType: 'Diagram',
        description: 'Updates an existing diagram'
      },
      {
        controller: 'DiagramController',
        method: 'DeleteDiagram',
        route: '/api/diagram/{id}',
        httpMethod: 'DELETE',
        parameters: [
          {
            name: 'id',
            type: 'int',
            isOptional: false,
            description: 'ID of the diagram to delete',
            source: 'route'
          }
        ],
        returnType: 'void',
        description: 'Deletes a diagram by ID'
      }
    ];
  }

  private getMockServiceMethods(): ServiceMethod[] {
    return [
      {
        name: 'GetDiagramsAsync',
        className: 'DiagramService',
        namespace: 'NsService.Services',
        returnType: 'Task<IEnumerable<Diagram>>',
        parameters: [
          {
            name: 'page',
            type: 'int',
            isOptional: true,
            defaultValue: '1',
            description: 'Page number'
          },
          {
            name: 'pageSize',
            type: 'int',
            isOptional: true,
            defaultValue: '10',
            description: 'Items per page'
          }
        ],
        isPublic: true,
        isStatic: false,
        isAsync: true,
        accessibility: 'public',
        description: 'Asynchronously retrieves diagrams with pagination'
      },
      {
        name: 'ValidateDiagram',
        className: 'DiagramValidator',
        namespace: 'NsService.Validators',
        returnType: 'ValidationResult',
        parameters: [
          {
            name: 'diagram',
            type: 'Diagram',
            isOptional: false,
            description: 'Diagram to validate'
          }
        ],
        isPublic: true,
        isStatic: true,
        isAsync: false,
        accessibility: 'public',
        description: 'Validates diagram data and returns validation result'
      },
      {
        name: 'CreateDiagramAsync',
        className: 'DiagramService',
        namespace: 'NsService.Services',
        returnType: 'Task<Diagram>',
        parameters: [
          {
            name: 'request',
            type: 'CreateDiagramRequest',
            isOptional: false,
            description: 'Diagram creation request'
          }
        ],
        isPublic: true,
        isStatic: false,
        isAsync: true,
        accessibility: 'public',
        description: 'Creates a new diagram asynchronously'
      }
    ];
  }

  private getMockServiceModels(): ServiceModel[] {
    return [
      {
        name: 'Diagram',
        namespace: 'NsService.Models',
        properties: [
          {
            name: 'Id',
            type: 'int',
            isReadOnly: false,
            isNullable: false,
            description: 'Unique identifier'
          },
          {
            name: 'Title',
            type: 'string',
            isReadOnly: false,
            isNullable: false,
            description: 'Diagram title'
          },
          {
            name: 'Description',
            type: 'string',
            isReadOnly: false,
            isNullable: true,
            description: 'Optional diagram description'
          },
          {
            name: 'CreatedAt',
            type: 'DateTime',
            isReadOnly: true,
            isNullable: false,
            description: 'Creation timestamp'
          },
          {
            name: 'UpdatedAt',
            type: 'DateTime',
            isReadOnly: true,
            isNullable: true,
            description: 'Last update timestamp'
          }
        ],
        isClass: true,
        isInterface: false,
        isEnum: false,
        description: 'Represents a diagram entity'
      },
      {
        name: 'CreateDiagramRequest',
        namespace: 'NsService.Models.Requests',
        properties: [
          {
            name: 'Title',
            type: 'string',
            isReadOnly: false,
            isNullable: false,
            description: 'Diagram title'
          },
          {
            name: 'Description',
            type: 'string',
            isReadOnly: false,
            isNullable: true,
            description: 'Optional diagram description'
          }
        ],
        isClass: true,
        isInterface: false,
        isEnum: false,
        description: 'Request model for creating diagrams'
      },
      {
        name: 'DiagramType',
        namespace: 'NsService.Enums',
        properties: [
          {
            name: 'Flowchart',
            type: 'int',
            isReadOnly: true,
            isNullable: false,
            defaultValue: '0'
          },
          {
            name: 'UML',
            type: 'int',
            isReadOnly: true,
            isNullable: false,
            defaultValue: '1'
          },
          {
            name: 'ERD',
            type: 'int',
            isReadOnly: true,
            isNullable: false,
            defaultValue: '2'
          }
        ],
        isClass: false,
        isInterface: false,
        isEnum: true,
        description: 'Enumeration of diagram types'
      }
    ];
  }
}
