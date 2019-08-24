import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CustomMaterialModule
  ]
})
export class SharedModule { }
