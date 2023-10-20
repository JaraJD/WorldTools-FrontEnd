import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ProductQueryModel } from "../../models/product/queries/product-query-model";
import { CreateProductCommandModel } from "../../models/product/commands/create-product-command-model";
import { PurchaseProductCommandModel } from "../../models/product/commands/purchase-product-command-model";
import { SaleProductCommandModel } from "../../models/product/commands/sale-product-command-model";
import { SaleResponseModel } from "../../models/sale/sale-response-model";


const httpOption = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')!}`
    //'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlQuery : string = 'https://localhost:7063/api/v1/product';
  private apiUrlCommand : string = 'https://localhost:7031/api/v1/product';

  constructor(private http: HttpClient) { }

  getAllProducts(branchId : string): Observable<ProductQueryModel[]> {
    const url = `${this.apiUrlQuery}/GetProducts/${branchId}`;
    return this.http.get<ProductQueryModel[]>(url, httpOption);
  }

  getProductById(productId: string): Observable<ProductQueryModel> {
    const url = `${this.apiUrlQuery}/${productId}`;
    return this.http.get<ProductQueryModel>(url, httpOption);
  }

  createProduct(product : CreateProductCommandModel): Observable<CreateProductCommandModel>{
    const url = `${this.apiUrlCommand}/register`;
    return this.http.post<CreateProductCommandModel>(url, product, httpOption);
  }

  AddStock(purchase : PurchaseProductCommandModel): Observable<ProductQueryModel>{
    const url = `${this.apiUrlCommand}/purchase`;
    return this.http.post<ProductQueryModel>(url, purchase, httpOption);
  }

  saleCustomer(purchase : SaleProductCommandModel): Observable<SaleResponseModel>{
    const url = `${this.apiUrlCommand}/customer-sale`;
    return this.http.patch<SaleResponseModel>(url, purchase, httpOption);
  }

  saleReseller(purchase : SaleProductCommandModel): Observable<SaleResponseModel>{
    const url = `${this.apiUrlCommand}/seller-sale`;
    return this.http.patch<SaleResponseModel>(url, purchase, httpOption);
  }
}
