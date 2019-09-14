import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogChanged: BehaviorSubject<void>;
  public catalogChanged$: Observable<void>;

  constructor(private http: HttpClient) {
    this.catalogChanged = new BehaviorSubject(null);
    this.catalogChanged$ = this.catalogChanged.asObservable();
  }

  uploadPDF(file): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    const options = { headers: headers };
   return this.http.post('http://localhost:3000/catalog', formData, options)
    .pipe(
      map(res => JSON.stringify(res)),
      catchError(err => err)
    );
  }

  public emitCatalogChangedEvent(): void {
    this.catalogChanged.next();
  }

  public getPDFCatalog(): Observable<Blob> {
    return this.http.get('http://localhost:3000/catalog',
    { responseType: 'blob' });
  }

  public showFileNames() {
    return this.http.get('http://localhost:3000/catalog');
  }
}
