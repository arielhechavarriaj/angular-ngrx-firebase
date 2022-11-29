import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { ProductModel } from '@app/models/product.interface';
import { AppState } from '@app/state/app.state';
import { selectListProducts } from '@app/state/selectors/products.selectors';
import {
  deleteProduct,
  selectedProduct,
} from '@app/state/actions/products.actions';

import { DialogMessageComponent } from '@app/products/components/dialog-message/dialog-message.component';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productsList: ProductModel[]=[];
  displayedColumns = ['name', 'serial_number', 'price', 'actions'];
  dataSource = new MatTableDataSource();
  private subs = new SubSink();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.store
      .select(selectListProducts)
      .subscribe((products) => {
        if (products) {
          this.productsList = products.map((item) => ({
            ...item,
            ['actions']: 'add-delete',
          }));
          this.dataSource.data = this.productsList;
        }
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  startEdit(row: any) {
    this.router.navigateByUrl(`products/add-edit/${row.id}`);
    this.store.dispatch(selectedProduct(row));
  }

  deleteItem(product: any) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { removeAction: false },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteProduct(product));
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
