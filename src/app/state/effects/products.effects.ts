import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {ProductsService} from "../../services/products.service";
import {createAction, props} from "@ngrx/store";
import {ProductModel} from "../../models/product.interface";

@Injectable()
export class ProductsEffects {


    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType('[Product List] Load Products'),
        mergeMap(() => this.productsService.getProducts()//TODO Retorna la data [...]
            .pipe(
                map(products => ({ type: '[Product List] Loaded success', products })),
                catchError(() => EMPTY)
            ))
    )
    );


    addProducts$ = createEffect(() => this.actions$.pipe(
        ofType('[Product Crud] Add Products'),
        mergeMap((product) => this.productsService.addProducts(product)
            .pipe(
                map(products => ({ type: '[Product Crud] Added Products' })),
                catchError(() => EMPTY)
            ))
    )
    );
    deleteProducts$ = createEffect(() => this.actions$.pipe(
        ofType(    '[Product Crud] Delete Product'  ),
        mergeMap((product) => this.productsService.deleteProduct(product)
            .pipe(
                map(products => ({ type: '[Product Crud] Deleted Products' })),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService
    ) { }
}
