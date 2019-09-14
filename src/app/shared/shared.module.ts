import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CatalogPreviewComponent } from './catalog-preview/catalog-preview.component';

@NgModule({
  declarations: [CatalogPreviewComponent],
  imports: [
    CommonModule,
    PdfViewerModule,
    CustomMaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    PdfViewerModule,
    CatalogPreviewComponent
  ],
  providers: [FormGroupDirective]
})


export class SharedModule { }

// platformBrowserDynamic().bootstrapModule(SharedModule);
