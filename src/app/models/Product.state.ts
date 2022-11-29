import { ProductModel } from "./product.interface";

export interface ProductState {
    loading: boolean,
    products: ReadonlyArray<ProductModel>;
    adding:boolean;
    addedProduct:boolean;
    deleting:boolean;
    productSelected:ProductModel
}
