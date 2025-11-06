import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WildcardComponent} from "./wildcard/wildcard.component";
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('../views/dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: 'requirement',
    loadChildren: () => import('../views/requirement/requirement-module').then(m => m.RequirementModule)
  },
  {
    path: 'library',
    loadChildren: () => import('../views/library/library-module').then(m => m.LibraryModule)
  },
    {
      path: 'setting',
      loadChildren: () => import('../views/setting/setting-module').then(m => m.SettingModule)
  },
  {
    path: 'white-board',
    loadChildren: () => import('../views/board/board-module').then(m => m.BoardModule)
  },
    {path: '**', component: WildcardComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
