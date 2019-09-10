import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    FileSelectDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
