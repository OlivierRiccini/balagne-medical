import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnDestroy {
  private subscription = new Subscription();
  public pdfSrc: string;

  constructor(private catalogService: CatalogService) {

    const subscription = this.catalogService.catalogChanged$.subscribe(
      () => this.getCatalog()
    );
    this.subscription.add(subscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getCatalog(): void {
    const subscription = this.catalogService.getPDFCatalog().subscribe(data => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = fileURL;
    });
    this.subscription.add(subscription);
  }

}
