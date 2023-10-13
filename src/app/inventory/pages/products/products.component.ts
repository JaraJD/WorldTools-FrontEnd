import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ProductQueryModel } from '../../models/product/queries/product-query-model';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductQueryModel[] = [];
  public product: any[] = [];
  textoEscrito = '';
  //private hubConnection: signalR.HubConnection

  constructor(
    private productService: ProductService,
    public webSocketService: WebSocketService
    ) { 
      //this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7031/WebSocked").build();
    }

    ngOnInit(): void {
      this.productService.getAllProducts().subscribe((data) => {
        this.products = data;
      });
      this.webSocketService.startConnection();
      this.webSocketService.addTransferChartDataListener();
      this.webSocketService.messageReceived.subscribe((message: any) => {
        this.products.push(message); // Actualiza la vista con el nuevo mensaje
      });
      /* this.hubConnection.on("ReceiveObject", data =>{
        this.messages.push(data)
        console.log(data);
      }); */

      /* this.hubConnection.start(); */

    }

    /* enviarRespuesta(): void {
      this.hubConnection.invoke("SendObjectToClient", this.textoEscrito);
    } */

}
