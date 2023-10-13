import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './pages/sales/sales.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';



@NgModule({
  declarations: [
    ProductsComponent,
    SalesComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    TableComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
