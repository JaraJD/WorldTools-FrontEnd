import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductCommandModel } from 'src/app/inventory/models/product/commands/create-product-command-model';
import { ProductService } from 'src/app/inventory/services/product/product.service';
import { WebSocketService } from 'src/app/inventory/services/web-socket/web-socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  createMode : boolean;
  branchId : string;
  productToCreate: CreateProductCommandModel | undefined;

  productForm: FormGroup;


  constructor(
    private productService: ProductService,
    public webSocketService: WebSocketService,
    private router: Router){
      this.branchId = localStorage.getItem('branchId') || '';
this.createMode = true;
this.productForm = new FormGroup({
  productName: new FormControl<string | null>(null, Validators.required),
  productDescription: new FormControl<string | null>(null, Validators.required),
  productPrice: new FormControl<number | null>(null, Validators.required),
  productInventoryStock: new FormControl<number | null>(null),
  productCategory: new FormControl<string | null>(null, Validators.required),
  branchId: new FormControl<string | null>(null)
});
}



ngOnInit(): void {}

  create(){
    this.productForm.get('productInventoryStock')?.setValue(0);
    this.productForm.get('branchId')?.setValue(this.branchId);

  this.productService.createProduct(this.productForm.value).subscribe({
      next: product => {
        this.productToCreate = product,
        Swal.fire(
          'Created',
          'Product created successfully',
          'success'
        )
      },
      error:err => console.log(err),
      complete: () => {
        this.productForm.reset();
        console.log('Complete');
      }
    });
  }
}
