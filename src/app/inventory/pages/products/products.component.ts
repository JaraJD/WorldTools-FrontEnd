import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ProductQueryModel } from '../../models/product/queries/product-query-model';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2';
import { PurchaseProductCommandModel } from '../../models/product/commands/purchase-product-command-model';
import { SaleProductCommandModel } from '../../models/product/commands/sale-product-command-model';
import { SaleResponseModel } from '../../models/sale/sale-response-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductQueryModel[] = [];
  addStockProduct :PurchaseProductCommandModel;
  addSaleProduct : SaleProductCommandModel;
  productToSale :PurchaseProductCommandModel;
  productsToSale : PurchaseProductCommandModel[];
  branchId : string;
  saleResponse : SaleResponseModel;

  constructor(
    private productService: ProductService,
    public webSocketService: WebSocketService
    ) {
      this.addStockProduct = {
        productId: '',
        productQuantity: 0
      }
      this.productToSale = {
        productId: '',
        productQuantity: 0
      }
      this.addSaleProduct = {
        number: 0,
        branchId: '',
        products: []
      }
      this.saleResponse = {
        saleId: '',
        saleNumber: 0,
        saleQuantity: 0,
        saleTotal: 0,
        saleType: '',
        branchId: ''
      }
      this.productsToSale = [];
      this.branchId = localStorage.getItem('branchId') || '';
    }

    ngOnInit(): void {
      this.productService.getAllProducts(this.branchId || '').subscribe((data) => {
        this.products = data;
      });
      this.webSocketService.startConnection();
      this.webSocketService.addTransferChartDataListener();
      this.webSocketService.productStockUpdated();
      this.webSocketService.productSale();
      this.webSocketService.messageReceived.subscribe((message: any) => {
        this.products.push(message);
      });
      this.webSocketService.messageUpdateStock.subscribe((message: any) => {
        this.products = this.products.map(product => {
          
          if (product.productId === message.productId) {
            product.productInventoryStock += message.productQuantity;
          }
          return product;
        });
      });

      this.webSocketService.messageSaleProduct.subscribe((message: SaleProductCommandModel) => {
        for (const saleProduct of message.products) {
          this.products = this.products.map(product => {
            if (product.productId === saleProduct.productId) {
              product.productInventoryStock -= saleProduct.productQuantity;
            }
            return product;
          });
        }
      });
    }

    async add(productId : string){
      const { value: quantity } = await Swal.fire({
        input: 'number',
        inputLabel: 'Add stock quantity',
        inputPlaceholder: 'Enter the quantity'
      })
      
      if (quantity) {
        Swal.fire(`Entered quantity: ${quantity}`)
        this.addStockProduct = {
          productId: productId,
          productQuantity: parseInt(quantity)
        }
        this.addStock();
      }
    }

    addStock(){
      this.productService.AddStock(this.addStockProduct).subscribe({
        next: product => {
          Swal.fire(
            'Added',
            product.productName + ' Stock added successfully',
            'success'
          )
        },
        error:err => console.log(err),
        complete: () => {
          console.log('Complete');
          this.webSocketService.updateStockProduct(this.addStockProduct);
        }
      });
    }

    async sale(productId : string){
      const { value: sale } = await Swal.fire({
        title: 'Select type of sale',
        input: 'select',
        inputOptions: {
          'customer': 'Customer',
          'reseller' : 'Reseller'
        },
        inputPlaceholder: 'Select a sale',
        showCancelButton: true,
      })
      
      if (sale) {
        Swal.fire(`You selected: ${sale}`)
        const { value: quantity } = await Swal.fire({
          input: 'number',
          inputLabel: 'Add quantity',
          inputPlaceholder: 'Enter the quantity'
        })
        
        if (quantity) {
          Swal.fire(`Entered quantity: ${quantity}`)
          this.productToSale = {
            productId: productId,
            productQuantity: parseInt(quantity)
          };
          this.productsToSale.push(this.productToSale);
          switch(sale){
            case 'customer':
              this.addCustomerSale(this.productsToSale)
              break;
            case 'reseller':
              this.addResellerSale(this.productsToSale);
              break;
          }
        }
      }
    }


    addCustomerSale(products : PurchaseProductCommandModel[]){
      this.addSaleProduct = {
        number: 1,
        branchId: this.branchId,
        products: products
      };
      this.productService.saleCustomer(this.addSaleProduct).subscribe({
        next: product => {
          this.saleResponse = product;
          Swal.fire(
            'Sold',
            'Product successfully sold',
            'success'
          )
        },
        error:err => console.log(err),
        complete: () => {
          console.log('Complete');
          this.webSocketService.saleProduct(this.addSaleProduct);
          this.webSocketService.updateSales(this.saleResponse);
          this.productsToSale = [];
        }
      });
    }

    addResellerSale(products : PurchaseProductCommandModel[]){
      this.addSaleProduct = {
        number: 2,
        branchId: this.branchId,
        products: products
      };
      this.productService.saleReseller(this.addSaleProduct).subscribe({
        next: product => {
          this.saleResponse = product;
          Swal.fire(
            'Sold',
            'Product successfully sold',
            'success'
          )
        },
        error:err => console.log(err),
        complete: () => {
          console.log('Complete');
          this.webSocketService.saleProduct(this.addSaleProduct);
          this.webSocketService.updateSales(this.saleResponse);
          this.productsToSale = [];
        }
      });
    }



}
