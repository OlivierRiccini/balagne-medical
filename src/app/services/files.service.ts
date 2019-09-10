import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  // uploadPDF(filename, filetype): any {
  //   return this.http.post('http://localhost:3000/catalog', filename);
  // }

  uploadPDF(file): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    ///
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    // const options = { headers: headers, observe: 'response' as 'body' };
    ///
    // const headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    const options = { headers: headers };
   return this.http.post('http://localhost:3000/catalog', formData, options)
    .pipe(
      map(res => JSON.stringify(res)),
      // tslint:disable-next-line: deprecation
      catchError(error => Observable.throw(error))
    );
  }

  downloadPDF(): any {
    return this.http.get('http://localhost:3000/catalog/' + '5d7826ed367dcb1a6a7201bf',
    { responseType: 'blob' });
  }

  showFileNames() {
    return this.http.get('http://localhost:3000/catalog');
  }
}
