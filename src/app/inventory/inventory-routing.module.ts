import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { SalesComponent } from "./pages/sales/sales.component";
import { ProductFormComponent } from "./components/product/product-form/product-form.component";

const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
        children: [
            {
                path: 'Home',
                component: HomeComponent
            },
            {
                path: 'Products',
                component: ProductsComponent
            },
            {
                path: 'CreateProduct',
                component: ProductFormComponent
            },
            {
                path: 'Sales',
                component: SalesComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }

]

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class InventoryRoutingModule {}