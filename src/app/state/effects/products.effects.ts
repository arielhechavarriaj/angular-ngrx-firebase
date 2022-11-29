import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; //TODO <---
import {EMPTY, of} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {ProductsService} from "@app/services/products.service";
import {Router} from "@angular/router";
import {ProductModel} from "@app/models/product.interface";

@Injectable()
export class ProductsEffects {



    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType('[Product List] Load Products'),
        mergeMap(() => this.productsService.get()//TODO Retorna la data [...]
            .pipe(
                map(products =>{
                  console.log(products)
                 return ({ type: '[Product List] Loaded success', products })
                } ),
                catchError(() => EMPTY)
            ))
    )
    );


    addProducts$ = createEffect(() => this.actions$.pipe(
        ofType('[Product Crud] Add Products'),
        mergeMap((product) => this.productsService.add(product)
            .pipe(
                map(products => ({ type: '[Product Crud] Added Products' })),
                catchError(() => EMPTY)
            ))
    )
    );
    deleteProducts$ = createEffect(() => this.actions$.pipe(
        ofType(    '[Product Crud] Delete Product'  ),
        mergeMap((product) => this.productsService.delete(product)
            .pipe(
                map(products => ({ type: '[Product Crud] Deleted Products' })),
                catchError(() => EMPTY)
            ))
    )
    );

    updateProducts$ = createEffect(() => this.actions$.pipe(
        ofType(        '[Product Crud] Update Products', ),
        mergeMap((product:ProductModel) => this.productsService.update(product.id,product)
          .pipe(
            map(products => ({ type:     '[Product Crud] Updated Products' })),
            catchError(() => EMPTY)
          ))
      )
      );


  //this.router.navigateByUrl('products/add-edit')

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,private router:Router
    ) { }
}
