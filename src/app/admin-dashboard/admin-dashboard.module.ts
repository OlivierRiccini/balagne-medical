import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
