import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 
import { Subject } from 'rxjs';
import { ProductQueryModel } from '../../models/product/queries/product-query-model';
import { SaleProductCommandModel } from '../../models/product/commands/sale-product-command-model';
import { SaleResponseModel } from '../../models/sale/sale-response-model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private hubConnection: signalR.HubConnection
  public messageReceived = new Subject<any>();
  public messageUpdateStock = new Subject<any>();
  public messageSaleProduct = new Subject<any>();
  public messageSaleUpdate = new Subject<any>();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7031/WebSocked").build();
  }

  public startConnection = () => {
    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('productsUpdate', (data) => {
      this.messageReceived.next(data);
    });
  }

  public productStockUpdated = () => {
    this.hubConnection.on('stockUpdate', (data : ProductQueryModel) => {
      this.messageUpdateStock.next(data);
    });
  }

  public productSale = () => {
    this.hubConnection.on('productSale', (data : SaleProductCommandModel) => {
      this.messageSaleProduct.next(data);
    });
  }

  public salesUpdate = () => {
    this.hubConnection.on('salesUpdate', (data : SaleResponseModel) => {
      this.messageSaleUpdate.next(data);
    });
  }

  public sendMessageToGroup = (product : any) => {
    this.hubConnection.invoke('SendObjectToProducts', product)
      .catch(err => console.error(err));
  }

  public updateStockProduct = (product : any) => {
    this.hubConnection.invoke('SendProductStockToUpdate', product)
      .catch(err => console.error(err));
  }

  public saleProduct = (product : any) => {
    this.hubConnection.invoke('SendProductTosale', product)
      .catch(err => console.error(err));
  }

  public updateSales = (sale : any) => {
    this.hubConnection.invoke('SendObjectToSale', sale)
      .catch(err => console.error(err));
  }
}
