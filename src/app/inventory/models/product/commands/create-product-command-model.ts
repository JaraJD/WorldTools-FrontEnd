export interface CreateProductCommandModel {
    productName: string;
    productDescription: string;
    productPrice: number;
    productInventoryStock: number;
    productCategory: string;
    branchId: string;
}