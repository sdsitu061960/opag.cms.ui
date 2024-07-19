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

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: DefaultComponentComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Main Dashboard' },
      { path: 'rbo-directory', component: ListRboComponent, title: 'Rbo Directory' },
      { path: 'sds-cooperative', component: SdscooplistComponent, title: 'SDS Cooperative' },
      { path: 'barangay', component: BarangayListComponent, title: 'Barangay' },
      { path: 'municipality', component: MunicipalityListComponent, title: 'Municipality' },
      { path: 'rbo-category', component: RboCategoryListComponent, title: 'RboCategory' },
      { path: 'coop-type', component: CooperativeTypeListComponent, title: 'Cooperative Types' },
      { path: 'ccop-asset', component: CoopAssetSizeListComponent, title: 'Cooperative Asset Size' },
      { path: 'business-activity', component: CoopBusinessListComponent, title: 'Business Activity' },
      { path: 'intervention-received', component: CoopReceivedListComponent, title: 'Intervention Received' },
      { path: 'coop-category-name', component: CoopCategoryNameListComponent, title: 'Category Name' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
