import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login/login.component';
import { DefaultComponentComponent } from './layout/default/default-component/default-component.component';
import { DashboardComponent } from './modules/Admin/dashboard/dashboard/dashboard.component';
import { SdscooplistComponent } from './modules/Admin/sds-cooperative/sdscooplist/sdscooplist.component';
import { ListRboComponent } from './modules/Admin/rbo-directory/list-rbo/list-rbo.component';
import { BarangayListComponent } from './modules/Admin/barangay/barangay-list/barangay-list.component';

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

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
