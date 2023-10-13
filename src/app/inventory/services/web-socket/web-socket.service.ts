import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private hubConnection: signalR.HubConnection
  public messageReceived = new Subject<any>();

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

  public sendMessageToGroup = (product : any) => {
    this.hubConnection.invoke('SendObjectToProducts', product)
      .catch(err => console.error(err));
  }


}
