
import { ActionReducerMap } from "@ngrx/store";
import { productsReducer} from "./reducers/products.reducers";
import {ProductState} from "../models/Product.state";
import {ProductModel} from "../models/product.interface";

export interface  AppState {
    products: ProductState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    products: productsReducer,
}
