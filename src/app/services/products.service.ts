import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { ProductModel } from '../models/product.interface';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dbPath = '/products';

  productsRef: AngularFirestoreCollection<ProductModel>;

  constructor(private db: AngularFirestore) {
    this.productsRef = db.collection(this.dbPath);
  }

  get(): Observable<
    { price: number; name: string; serial_number: string; id: string }[]
  > {
    return this.productsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          const data = c.payload.doc.data();
          return {
            id: c.payload.doc.id,
            name: data.name,
            serial_number: data.serial_number,
            price: data.price,
          };
        })
      )
    );
  }

  add(product: ProductModel) {
    return of(
      this.productsRef.add({
        ...{
          id: this.db.createId(),
          name: product.name,
          price: product.price,
          serial_number: product.serial_number,
        },
      })
    );
  }

  update(id: string | undefined, data: any): Observable<any> {
    return from(
      this.productsRef.doc(id).update({
        name: data.name,
        price: data.price,
        serial_number: data.serial_number,
      })
    );
  }

  delete(data:ProductModel): Observable<any> {
  //  return of(this.productsRef.doc(id).delete());
    return from(
      this.productsRef.doc(data.id).delete()
    );
  }
}
