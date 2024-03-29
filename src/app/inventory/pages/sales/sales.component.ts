import { Component } from '@angular/core';
import { BranchService } from '../../services/branch/branch.service';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { SaleResponseModel } from '../../models/sale/sale-response-model';
import { AuthService } from 'src/app/authentication/services/auth/auth.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  sales: SaleResponseModel[] = [];
  branchId : string;

  constructor(
    private branchService: BranchService,
    public webSocketService: WebSocketService,
    private authService: AuthService
    ) {
      const user = this.authService.userData;
      this.branchId = user?.branchId ?? '';
    }


    ngOnInit(): void {
      this.branchService.getAllSales(this.branchId || '').subscribe((data) => {
        this.sales = data;
      });
      this.webSocketService.startConnection();
      this.webSocketService.salesUpdate();
      this.webSocketService.messageSaleUpdate.subscribe((message: any) => {
        this.sales.push(message);
      });
    }
}
