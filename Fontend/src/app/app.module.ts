import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLayoutUserComponent } from './layouts/base-layout-user/base-layout-user.component';
import { BaseLayoutAdminComponent } from './layouts/base-layout-admin/base-layout-admin.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageDetailComponent } from './pages/page-detail/page-detail.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryAddComponent } from './pages/category-add/category-add.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { FormsModule } from "@angular/forms"
import { ClickOutsideModule } from 'ng-click-outside'
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailAdminComponent } from './pages/product-detail-admin/product-detail-admin.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { DetailCategoryComponent } from './pages/detail-category/detail-category.component';
import { AddToCartComponent } from './pages/add-to-cart/add-to-cart.component';
import { NgxPaginationModule } from "ngx-pagination";
import { FavouriteComponent } from './pages/favourite/favourite.component'
import { ListCategoryUseComponent } from './pages/list-category-use/list-category-use.component';





@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutUserComponent,
    BaseLayoutAdminComponent,
    HomePageComponent,
    PageDetailComponent,
    SigninComponent,
    SignupComponent,
    CategoryAddComponent,
    DashBoardComponent,
    ListCategoriesComponent,
    CategoryEditComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductDetailAdminComponent,
    ProductUpdateComponent,
    UserComponent,
    UserUpdateComponent,
    ProductListComponent,
    DetailCategoryComponent,
    AddToCartComponent,
    FavouriteComponent,
    ListCategoryUseComponent


  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
