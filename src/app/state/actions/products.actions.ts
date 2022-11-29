
import { createAction, props } from '@ngrx/store';
import {ProductModel} from "@app/models/product.interface";


export const loadProducts = createAction(
    '[Product List] Load Products' //TODO type*
);

export const loadedProducts = createAction(
    '[Product List] Loaded success',
    props<{ products: ProductModel[] }>()
)

export const addProducts = createAction(
    '[Product Crud] Add Products',
    props<{ products: ProductModel[] }>()
)
export const addedProducts = createAction(
    '[Product Crud] Added Products'

)
export const updateProducts = createAction(
    '[Product Crud] Update Products',
    props<{ products: ProductModel }>()
)
export const updatedProducts = createAction(
    '[Product Crud] Updated Products'

)

export const selectedProduct = createAction(
    '[Product Crud] Selected Product',
    props<{ productSelected: ProductModel }>()
)

export const deleteProduct = createAction(
    '[Product Crud] Delete Product',
    props<{ products: ProductModel }>()
)
export const deletedProduct = createAction(
    '[Product Crud] Deleted Products'

)
