import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CatalogPreviewComponent } from './catalog-preview/catalog-preview.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    CatalogPreviewComponent,
    ContactFormComponent
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
    ContactFormComponent
  ],
  providers: [FormGroupDirective]
})

export class SharedModule { }
