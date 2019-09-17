import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndividualsComponent } from './individuals/individuals.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { PharmacistsComponent } from './pharmacists/pharmacists.component';
import { ContactComponent } from './contact/contact.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuardActivate, AuthGuardLoad } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AuthComponent } from './auth/auth.component';
import { PartnersComponent } from './partners/partners.component';
import { AuthAdminGuardActivate } from './services/auth-admin-guard.service';
import { CatalogComponent } from './catalog/catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndividualsComponent,
    ProfessionalsComponent,
    PharmacistsComponent,
    ContactComponent,
    TermsOfUseComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    PartnersComponent,
    CatalogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AdminDashboardModule
  ],
  providers: [
    AuthService,
    AuthGuardLoad,
    AuthGuardActivate,
    AuthAdminGuardActivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
