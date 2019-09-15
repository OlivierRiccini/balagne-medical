import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';
import { UserInterfaceService } from '../services/user-interface.service';

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
    this.createForm();
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

  private createForm(): void {
    this.form = this.fb.group({
      file: ['', []]
    });
  }

}
