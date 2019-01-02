import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListsComponent } from './lists/lists.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'list/:id',
    component: ListComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: '',
    redirectTo: '/lists',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
