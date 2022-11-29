import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import {ProductState} from "@app/models/Product.state";

export const selectProductsFeature = (state: AppState) => state.products;//TODO: PADRE

export const selectListProducts= createSelector(
  selectProductsFeature,
    (state: ProductState ) => state.products
);

export const selectLoading = createSelector(
  selectProductsFeature,
    (state: ProductState) => state.loading
);
export const selectAddedProduct= createSelector(
  selectProductsFeature,
    (state: ProductState) => state.addedProduct
);

export const selectAdding = createSelector(
  selectProductsFeature,
    (state: ProductState) => state.adding
);
export const selectProductedById  = (id: any)  => createSelector(
  selectProductsFeature,
    (state: ProductState) => state.products.filter((_) => _.id == id)
);

