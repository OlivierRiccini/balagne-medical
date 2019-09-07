import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

const adminDashboardRoutes: Routes = [
    { path: '', component: AdminDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminDashboardRoutes)
    ],
    exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
