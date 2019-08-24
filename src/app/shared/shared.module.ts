import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ]
})
export class SharedModule { }
