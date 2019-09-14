import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnDestroy {
  @ViewChild('file', {static: false}) public file;
  public form: FormGroup;
  public files: Set<File> = new Set();
  private subscription = new Subscription();

  constructor(private catalogService: CatalogService, private fb: FormBuilder) {
    this.form = this.fb.group({
      file: ['', []]
    });
  }

  public onUpload(): void {
    const subscription = this.catalogService.uploadPDF(this.file.nativeElement.files[0]).subscribe(
      () => this.catalogService.emitCatalogChangedEvent(),
      err => console.log(err)
    );
    this.subscription.add(subscription);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
