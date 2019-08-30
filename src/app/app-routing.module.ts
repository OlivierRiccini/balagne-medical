import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndividualsComponent } from './individuals/individuals.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { PharmacistsComponent } from './pharmacists/pharmacists.component';
import { ContactComponent } from './contact/contact.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { AuthGuardActivate } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { DesktopDeviceContainerComponent } from './desktop-device-container/desktop-device-container.component';
import { MobileDeviceContainerComponent } from './mobile-device-container/mobile-device-container.component';

const routes: Routes = [
  { path: 'desktop', component: DesktopDeviceContainerComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'services-particuliers', component: IndividualsComponent },
    { path: 'services-professionnels', component: ProfessionalsComponent },
    { path: 'pharmacies', component: PharmacistsComponent, canActivate: [AuthGuardActivate], data: { device: 'desktop' } },
    { path: 'contact',  component: ContactComponent },
    { path: 'mentions-legales',  component: TermsOfUseComponent },
    { path: 'admin-dashboard', canActivate: [AuthGuardActivate], data: { device: 'desktop' }, loadChildren: () => import('./admin-dashboard/admin-dashboard.module')
      .then(m => m.AdminDashboardModule) 
    },
    { path: "**", redirectTo: '/' }
  ]},
  { path: 'mobile', component: MobileDeviceContainerComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'services-particuliers', component: IndividualsComponent },
    { path: 'services-professionnels', component: ProfessionalsComponent },
    { path: 'pharmacies', component: PharmacistsComponent, canActivate: [AuthGuardActivate], data: { device: 'mobile' } },
    { path: 'contact',  component: ContactComponent },
    { path: 'mentions-legales',  component: TermsOfUseComponent },
    { path: 'admin-dashboard', canActivate: [AuthGuardActivate], data: { device: 'desktop' }, loadChildren: () => import('./admin-dashboard/admin-dashboard.module')
      .then(m => m.AdminDashboardModule) 
    },
    { path: "**", redirectTo: '/' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
