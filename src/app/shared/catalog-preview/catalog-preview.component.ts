import { Component, OnDestroy } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-preview',
  templateUrl: './catalog-preview.component.html',
  styleUrls: ['./catalog-preview.component.scss']
})
export class CatalogPreviewComponent implements OnDestroy {
  private getCatalogSubscription = new Subscription();
  private updateCatalogSubscription = new Subscription();
  public pdfSrc: string;

  constructor(private catalogService: CatalogService, private router: Router) {

    const subscription = this.catalogService.catalogChanged$.subscribe(
      () => this.getCatalog()
    );
    this.updateCatalogSubscription.add(subscription);
  }

  public onOpenPDF(): void {
    this.router.navigate(['', 'catalogue']);
    // this.router.navigate([]).then(result => {  window.open('./catalogue', '_blank'); });
    // this.catalogService.getPDFCatalog().subscribe(data => {
    //   const file = new Blob([data], { type: 'application/pdf' });
    //   const fileURL = URL.createObjectURL(file);
    //   const newWindow = window.open(fileURL, 'Catalogue Balagne Médical');
    //   setTimeout(() => {
    //     // For Firefox it is necessary to delay revoking the ObjectURL
    //     if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    //       alert('Veuillez vous assurer que le bloqueur de pop-up est désactivé');
    //     }
    //     window.URL.revokeObjectURL(fileURL);
    //   }, 250);
    // });
  }

  public ngOnDestroy() {
    this.getCatalogSubscription.unsubscribe();
    this.updateCatalogSubscription.unsubscribe();
  }

  private getCatalog(): void {
    const subscription = this.catalogService.getPDFCatalog().subscribe(data => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = fileURL;
    });
    this.getCatalogSubscription.add(subscription);
  }

}
