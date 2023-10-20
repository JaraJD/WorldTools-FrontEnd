import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleResponseModel } from '../../models/sale/sale-response-model';
import { Observable } from 'rxjs';


const httpOption = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')!}`
    //'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private apiUrlQuery : string = 'https://localhost:7063/api/v1/branch';

  constructor(private http: HttpClient) { }

  getAllSales(branchId : string): Observable<SaleResponseModel[]> {
    const url = `${this.apiUrlQuery}/GetSalesBranch/${branchId}`;
    return this.http.get<SaleResponseModel[]>(url, httpOption);
  }

}
