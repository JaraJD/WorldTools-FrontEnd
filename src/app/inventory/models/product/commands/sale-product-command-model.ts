import { PurchaseProductCommandModel } from "./purchase-product-command-model";

export interface SaleProductCommandModel {
    number: number;
    branchId: string;
    products: PurchaseProductCommandModel[];
  }