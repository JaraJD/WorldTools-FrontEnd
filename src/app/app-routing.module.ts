import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent
    },
    {
      path: 'security', // localhost:4200/security
      loadChildren: () =>
        import('../app/authentication/authentication.module').then(
          (m) => m.AuthenticationModule
      ),
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