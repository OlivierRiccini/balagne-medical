import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndividualsComponent } from './individuals/individuals.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { PharmacistsComponent } from './pharmacists/pharmacists.component';
import { ContactComponent } from './contact/contact.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'services-particuliers',  component: IndividualsComponent },
  { path: 'services-professionnels',  component: ProfessionalsComponent },
  { path: 'catalogue-pharmacies',  component: PharmacistsComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'mentions-legales',  component: TermsOfUseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
