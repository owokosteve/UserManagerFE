import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LibraryComponent } from './library';
import { BasicEj } from '../../commonComponents/basic-ej.modules';
import { EjSearchComponent } from '../../commonComponents/ej-search/ej-search.component';

// Import new components
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ApisComponent } from './apis/apis.component';
import { MethodsComponent } from './methods/methods.component';
import { ModelsComponent } from './models/models.component';

// Import service
import { DocumentationService } from '../../services/documentation.service';

const routes: Routes = [
  { path: '', component: LibraryComponent }
];

@NgModule({
  declarations: [
    LibraryComponent,
    GettingStartedComponent,
    ApisComponent,
    MethodsComponent,
    ModelsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BasicEj,
    EjSearchComponent,
    RouterModule.forChild(routes)
  ],
  providers: [
    DocumentationService
  ]
})
export class LibraryModule { }
