import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequirementComponent } from './requirement';

const routes: Routes = [
  { path: '', component: RequirementComponent }
];

@NgModule({
  declarations: [
    RequirementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RequirementModule { }