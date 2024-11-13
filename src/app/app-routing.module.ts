import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login/login.component';
import { DefaultComponentComponent } from './layout/default/default-component/default-component.component';
import { DashboardComponent } from './modules/Admin/dashboard/dashboard/dashboard.component';
import { SdscooplistComponent } from './modules/Admin/sds-cooperative/sdscooplist/sdscooplist.component';
import { ListRboComponent } from './modules/Admin/rbo-directory/list-rbo/list-rbo.component';
import { BarangayListComponent } from './modules/Admin/maintenance/barangay/barangay-list/barangay-list.component';
import { MunicipalityListComponent } from './modules/Admin/maintenance/municipality/municipality-list/municipality-list.component';
import { RboCategoryListComponent } from './modules/Admin/maintenance/rbo category/rbo-category-list/rbo-category-list.component';
import { CooperativeTypeListComponent } from './modules/Admin/maintenance/cooperative type/cooperative-type-list/cooperative-type-list.component';
import { CoopAssetSizeListComponent } from './modules/Admin/maintenance/cooperative asset size/coop-asset-size-list/coop-asset-size-list.component';
import { CoopBusinessListComponent } from './modules/Admin/maintenance/cooperative business/coop-business-list/coop-business-list.component';
import { CoopReceivedListComponent } from './modules/Admin/maintenance/intervention recieved/coop-received-list/coop-received-list.component';
import { CoopCategoryNameListComponent } from './modules/Admin/maintenance/cooperative Name/coop-category-name-list/coop-category-name-list.component';
import { AddSdscoopComponent } from './modules/Admin/sds-cooperative/add-sdscoop/add-sdscoop.component';
import { CreateRboComponent } from './modules/Admin/rbo-directory/create-rbo/create-rbo.component';
import { CommodityListComponent } from './modules/Admin/maintenance/commodity/commodity-list/commodity-list.component';
import { ReportsComponent } from './modules/Admin/reports/reports/reports.component';
import { RegisteredWithListComponent } from './modules/Admin/maintenance/RegisteredWith/registered-with-list/registered-with-list.component';
import { authGuard } from './shared/auth/guards/auth.guard';
import { NotfoundComponent } from './shared/components/notfoundcomponent/notfound/notfound.component';

// const routes: Routes = [
//   { path: '', component: LoginComponent },
//   {
//     path: 'admin',
//     canActivate: [authGuard],
//     component: DefaultComponentComponent, children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', component: DashboardComponent, title: 'Main Dashboard', canActivate: [authGuard] },
//       { path: 'rbo-directory', component: ListRboComponent, title: 'Rbo Directory', canActivate: [authGuard] },
//       { path: 'rbo-directory/add', component: CreateRboComponent, title: 'Add Rbo Directory', canActivate: [authGuard] },
//       { path: 'sds-cooperative', component: SdscooplistComponent, title: 'SDS Cooperative', canActivate: [authGuard] },
//       { path: 'barangay', component: BarangayListComponent, title: 'Barangay', canActivate: [authGuard] },
//       { path: 'municipality', component: MunicipalityListComponent, title: 'Municipality', canActivate: [authGuard] },
//       { path: 'rbo-category', component: RboCategoryListComponent, title: 'RboCategory', canActivate: [authGuard] },
//       { path: 'coop-type', component: CooperativeTypeListComponent, title: 'Cooperative Types', canActivate: [authGuard] },
//       { path: 'ccop-asset', component: CoopAssetSizeListComponent, title: 'Cooperative Asset Size', canActivate: [authGuard] },
//       { path: 'business-activity', component: CoopBusinessListComponent, title: 'Business Activity', canActivate: [authGuard] },
//       { path: 'intervention-received', component: CoopReceivedListComponent, title: 'Intervention Received', canActivate: [authGuard] },
//       { path: 'coop-category-name', component: CoopCategoryNameListComponent, title: 'Category Name', canActivate: [authGuard] },
//       { path: 'sds-cooperative/add', component: AddSdscoopComponent, title: 'Add SDS Cooperative', canActivate: [authGuard] },
//       { path: 'commodity', component: CommodityListComponent, title: 'Commodity', canActivate: [authGuard] },
//       { path: 'registeredTo', component: RegisteredWithListComponent, title: 'Registered Category', canActivate: [authGuard] },
//       { path: 'reports', component: ReportsComponent, title: 'Reports', canActivate: [authGuard] },
//     ]
//   }
// ];

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: DefaultComponentComponent,
    canActivate: [authGuard], // Auth guard applied to the parent route
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Main Dashboard' },
      { path: 'rbo-directory', component: ListRboComponent, title: 'Rbo Directory' },
      { path: 'rbo-directory/add', component: CreateRboComponent, title: 'Add Rbo Directory' },
      { path: 'sds-cooperative', component: SdscooplistComponent, title: 'SDS Cooperative' },
      { path: 'barangay', component: BarangayListComponent, title: 'Barangay' },
      { path: 'municipality', component: MunicipalityListComponent, title: 'Municipality' },
      { path: 'rbo-category', component: RboCategoryListComponent, title: 'RboCategory' },
      { path: 'coop-type', component: CooperativeTypeListComponent, title: 'Cooperative Types' },
      { path: 'ccop-asset', component: CoopAssetSizeListComponent, title: 'Cooperative Asset Size' },
      { path: 'business-activity', component: CoopBusinessListComponent, title: 'Business Activity' },
      { path: 'intervention-received', component: CoopReceivedListComponent, title: 'Intervention Received' },
      { path: 'coop-category-name', component: CoopCategoryNameListComponent, title: 'Category Name' },
      { path: 'sds-cooperative/add', component: AddSdscoopComponent, title: 'Add SDS Cooperative' },
      { path: 'commodity', component: CommodityListComponent, title: 'Commodity' },
      { path: 'registeredTo', component: RegisteredWithListComponent, title: 'Registered Category' },
      { path: 'reports', component: ReportsComponent, title: 'Reports' }
    ]
  },
  { path: '404', component: NotfoundComponent }, 
  { path: '**', redirectTo: '/404' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
