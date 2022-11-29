
import { createReducer, on } from '@ngrx/store';
import {
  addedProducts,
  addProducts,
  deletedProduct,
  deleteProduct,
  loadedProducts,
  loadProducts, selectedProduct, updateProducts
} from "../actions/products.actions";
import {ProductState} from "@app/models/Product.state";


//TODO: (2) Estado inicial!

export const initialState: ProductState = { loading: false,adding: false,deleting: false, products: [],addedProduct:false,productSelected:{
  name:'',id:'-1',serial_number:'',price:-1
  } }


export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => {
        return { ...state, loading: true,adding: false,addedProduct: false, productSelected:{
            name:'',id:'-1',serial_number:'',price:-1
          }  }
    }),
    on( loadedProducts, (state, { products }) => {
        return { ...state, loading: false, products }
    }),
  on( addProducts, (state, { products  }) => {
      return { ...state, adding: true, products }
    }),
    on( addedProducts, (state,{}) => {
        return { ...state, adding: false,addedProduct: true }
    }),
  on( deleteProduct, (state,{ products:product }) => {
        return { ...state, loading: true }
    }) ,
on( deletedProduct, (state,{}) => {
        return { ...state, loading: false }
    }),
  on( selectedProduct, (state, {productSelected}) => {
        return { ...state, loading: false ,productSelected }
    })
  , on( updateProducts, (state, {products}) => {
        return { ...state, loading: false  }
    })

);
