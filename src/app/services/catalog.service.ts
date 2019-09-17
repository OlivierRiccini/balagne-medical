import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  public uploadPDF(file): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    const options = { headers: headers };
   return this.http.post(`${environment.apiUrl}/catalog`, formData, options)
    .pipe(
      map(res => JSON.stringify(res)),
      catchError(err => err)
    );
  }

  public emitCatalogChangedEvent(): void {
    this.catalogChanged.next();
  }

  public getPDFCatalog(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/catalog`,
    { responseType: 'blob' });
  }

  public showFileNames() {
    return this.http.get(`${environment.apiUrl}/catalog`);
  }
}
