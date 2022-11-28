
import { createAction, props } from '@ngrx/store';
import {ProductModel} from "../../models/product.interface"; //TODO: <----


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

export const deleteProduct = createAction(
    '[Product Crud] Delete Product',
    props<{ products: ProductModel }>()
)
export const deletedProduct = createAction(
    '[Product Crud] Deleted Products'

)
