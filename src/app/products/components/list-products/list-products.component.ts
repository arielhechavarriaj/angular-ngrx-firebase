import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AppState} from "../../../state/app.state";
import {Store} from "@ngrx/store";
import {selectListProducts} from "../../../state/selectors/products.selectors";
import {ProductModel} from "../../../models/product.interface";
import {deletedProduct, deleteProduct} from "../../../state/actions/products.actions";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
productsList  !:ProductModel[];
  displayedColumns = ['name','serial_number','price',    "actions"];
  dataSource = new MatTableDataSource();
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
 this.store.select(selectListProducts).subscribe(products=>{
   if(products)
   {
     this.productsList=  products.map((item) => ({
       ...item,
       ["actions"] :"add-delete"
     }));
     this.dataSource.data=this.productsList
   }
 })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  startEdit(row:any) {

  }

  deleteItem(product:any) {
this.store.dispatch(deleteProduct(product))
  }
}
