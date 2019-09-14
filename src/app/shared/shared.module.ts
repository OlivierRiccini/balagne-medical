import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CatalogPreviewComponent } from './catalog-preview/catalog-preview.component';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

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
  ]
})


export class SharedModule { }

// platformBrowserDynamic().bootstrapModule(SharedModule);
