import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPreviewComponent } from './catalog-preview.component';

describe('CatalogPreviewComponent', () => {
  let component: CatalogPreviewComponent;
  let fixture: ComponentFixture<CatalogPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
