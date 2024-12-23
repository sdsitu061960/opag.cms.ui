import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponentComponent } from './layout/default/default-component/default-component.component';
import { FooterComponent } from './shared/components/footer/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar/sidebar.component';
import { LoginComponent } from './modules/public/login/login/login.component';
import { DashboardComponent } from './modules/Admin/dashboard/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { SdscooplistComponent } from './modules/Admin/sds-cooperative/sdscooplist/sdscooplist.component';
import { AddSdscoopComponent } from './modules/Admin/sds-cooperative/add-sdscoop/add-sdscoop.component';
import { BarangayListComponent } from './modules/Admin/maintenance//barangay/barangay-list/barangay-list.component';
import { CreateRboComponent } from './modules/Admin/rbo-directory/create-rbo/create-rbo.component';
import { ListRboComponent } from './modules/Admin/rbo-directory/list-rbo/list-rbo.component';
import { BarangayService } from './modules/Admin/maintenance/barangay/service/barangay-service.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MunicipalityListComponent } from './modules/Admin/maintenance/municipality/municipality-list/municipality-list.component';
import { RboCategoryListComponent } from './modules/Admin/maintenance/rbo category/rbo-category-list/rbo-category-list.component';
import { CooperativeTypeListComponent } from './modules/Admin/maintenance/cooperative type/cooperative-type-list/cooperative-type-list.component';
import { CoopAssetSizeListComponent } from './modules/Admin/maintenance/cooperative asset size/coop-asset-size-list/coop-asset-size-list.component';
import { CoopBusinessListComponent } from './modules/Admin/maintenance/cooperative business/coop-business-list/coop-business-list.component';
import { CoopReceivedListComponent } from './modules/Admin/maintenance/intervention recieved/coop-received-list/coop-received-list.component';
import { CoopCategoryNameListComponent } from './modules/Admin/maintenance/cooperative Name/coop-category-name-list/coop-category-name-list.component';
import { CommodityListComponent } from './modules/Admin/maintenance/commodity/commodity-list/commodity-list.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ReportsComponent } from './modules/Admin/reports/reports/reports.component';
import { RegisteredWithListComponent } from './modules/Admin/maintenance/RegisteredWith/registered-with-list/registered-with-list.component';
import { AuthInterceptor } from './shared/components/interceptors/auth.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UserComponent } from './modules/Admin/maintenance/user/user-list/user.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponentComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    SdscooplistComponent,
    AddSdscoopComponent,
    BarangayListComponent,
    CreateRboComponent,
    ListRboComponent,
    MunicipalityListComponent,
    RboCategoryListComponent,
    CooperativeTypeListComponent,
    CoopAssetSizeListComponent,
    CoopBusinessListComponent,
    CoopReceivedListComponent,
    CoopCategoryNameListComponent,
    CommodityListComponent,
    ReportsComponent,
    RegisteredWithListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    NgSelectModule
  ],
  providers: [BarangayService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
