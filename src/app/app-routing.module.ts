import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent
    },
    {
      path: 'inventory', // localhost:4200/inventory
          loadChildren: () =>
            import('../app/inventory/inventory.module').then(
              (m) => m.InventoryModule
          ),
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }