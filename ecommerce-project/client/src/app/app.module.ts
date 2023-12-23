import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginGuard } from './guards/login.guard';
import { NewProductsCardsComponent } from './components/home/new-products-cards/new-products-cards.component';
import { TopRatedProductsComponent } from './components/home/top-rated-products/top-rated-products.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart-details', component: CartDetailsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'search/:keyword', component: ProductListComponent },
      { path: 'category/:id/products', component: ProductListComponent },
      { path: 'category', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    HomeComponent,
    NewProductsCardsComponent,
    TopRatedProductsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [
    ProductService,
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
