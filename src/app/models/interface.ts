import {  } from './enums';


export interface InputMapItem {
    Id: string | number ;
    Input: string ;
}

export type InputMap = InputMapItem[];

export interface DictPar{
    Key: string,
    Value: string,
}

export interface Box {
  id: number;
  x: number;
  y: number;
  label: string;
  isDragging?: boolean;
}

export interface Connection {
  from: number; // box id
  to: number;   // box id
}

export interface NavUI {
  Name: string;
  IconClass: string;
  RedirectLink: string;
  IsActive: boolean;
  CanBeActive: boolean;
  ActivationFragment: string[];
}


// API Endpoint interfaces
export interface ApiEndpoint {
  controller: string;
  method: string;
  route: string;
  httpMethod: string;
  parameters: Parameter[];
  returnType: string;
  description?: string;
  examples?: string[];
}

export interface Parameter {
  name: string;
  type: string;
  isOptional: boolean;
  description?: string;
  source: 'query' | 'body' | 'route' | 'header';
}

// Service Method interfaces
export interface ServiceMethod {
  name: string;
  className: string;
  namespace: string;
  returnType: string;
  parameters: MethodParameter[];
  isPublic: boolean;
  isStatic: boolean;
  isAsync: boolean;
  description?: string;
  examples?: string[];
  accessibility: 'public' | 'private' | 'protected' | 'internal';
}

export interface MethodParameter {
  name: string;
  type: string;
  isOptional: boolean;
  defaultValue?: string;
  description?: string;
}

// Service Model interfaces
export interface ServiceModel {
  name: string;
  namespace: string;
  properties: ModelProperty[];
  isClass: boolean;
  isInterface: boolean;
  isEnum: boolean;
  description?: string;
  inheritance?: string[];
}

export interface ModelProperty {
  name: string;
  type: string;
  isReadOnly: boolean;
  isNullable: boolean;
  description?: string;
  defaultValue?: string;
}


