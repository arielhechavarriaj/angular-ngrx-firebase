import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, of} from "rxjs";
import {ProductModel} from "../models/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private store: AngularFirestore) {}

  getProducts(){
   return this.store.collection('products').valueChanges({ id: 'id' })   as Observable<ProductModel[]>;
  }
  addProducts(data:ProductModel){
    const id = this.store.createId();
     return of(this.store.collection('products').add(Object.assign({}, { id }, {...
         {
           name:data.name,
           price:data.price,
           serial_number:data.serial_number}
     })))

  }
  deleteProduct(data:ProductModel){
    console.log('llegaste?')
  //  return of( this.store.collection('products').doc(data.id).delete())
  //  const id=this.store.collection('products').doc(data.id).ref.path


    return of(   this.store.doc(`products/${data.id}`).delete())
  }
}
