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
import { BarangayListComponent } from './modules/Admin/barangay/barangay-list/barangay-list.component';
import { CreateRboComponent } from './modules/Admin/rbo-directory/create-rbo/create-rbo.component';
import { ListRboComponent } from './modules/Admin/rbo-directory/list-rbo/list-rbo.component';
import { BarangayService } from './modules/Admin/barangay/service/barangay-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    ListRboComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [BarangayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
