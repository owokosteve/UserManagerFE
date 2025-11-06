import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Role} from "../models/enums";

@Pipe({
    name: 'roleCheck'
})
@Injectable({
    providedIn: 'root',
})
export class RolePipe implements PipeTransform {

  ROLE_ACTION_MAPPING: { [key: string]: Role[] } = {
    'Create_Requirement': [Role.Customer, Role.Architect, Role.Developer, Role.Tester],
    'Edit_Requiremnt': [Role.Customer, Role.Architect],
       // "View_AdminPage": [Role.Admin, Role.InsightCreator],
       // "View_Insight_Generator": [Role.Admin, Role.InsightCreator],
    };
    
    constructor() {
        
    }
    transform(actionName: string, role: Role): boolean {
        const allowedRoles = this.ROLE_ACTION_MAPPING[actionName] || [];
        return allowedRoles.includes(role);
    }

  //  roleControl(value: Role): string[] {
  //      switch (value) {
  //          case Role.Admin:
  //              return ['Admin', 'SalesRep', 'Manager', 'InsightCreator'];
  //          case Role.Manager:
  //              return ['SalesRep', 'Manager'];
  //          case Role.SalesRep:
  //          case Role.InsightCreator:
  //          default:
  //              return [];
  //      }
  //}

    //roleChecker(check: Role): boolean {
        
    //}    
}
