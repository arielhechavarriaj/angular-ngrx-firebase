import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../shared/material.module';
import {LayoutComponent} from './components/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {environment} from '@env/environment';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {IntroTaskComponent} from './components/intro-task/intro-task.component';
import {AboutComponent} from './components/about/about.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ROOT_REDUCERS} from './state/app.state';
import {ProductsEffects} from './state/effects/products.effects';
import {AngularFireModule, FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {ProdCurrencyDirective} from "@app/directives/prod-currency.directive";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IntroTaskComponent,
    AboutComponent,
    PageNotFoundComponent,
    ProdCurrencyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ProductsEffects]),

  ],
  providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
  bootstrap: [AppComponent],
  exports: [
    ProdCurrencyDirective

  ]
})
export class AppModule {}
