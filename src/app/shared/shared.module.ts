import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CatalogPreviewComponent } from './catalog-preview/catalog-preview.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserInfoFormComponent } from './user-form/user-info-form/user-info-form.component';
import { UserPasswordFormComponent } from './user-form/user-password-form/user-password-form.component';

@NgModule({
  declarations: [
    CatalogPreviewComponent,
    ContactFormComponent,
    UserFormComponent,
    UserInfoFormComponent,
    UserPasswordFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    CustomMaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    PdfViewerModule,
    CatalogPreviewComponent,
    ContactFormComponent,
    UserFormComponent,
    UserInfoFormComponent,
    UserPasswordFormComponent
  ],
  providers: [FormGroupDirective]
})

export class SharedModule { }
