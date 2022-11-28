import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {selectLoading} from "../../state/selectors/products.selectors";
import {loadProducts} from "../../state/actions/products.actions";
import {AppState} from "../../state/app.state";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  loading$: Observable<boolean> = new Observable()
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private store: Store<AppState>) {}





  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)//TODO: true, false

    this.store.dispatch(loadProducts()) //se comienza  a  cargar los datos


  }

}
