import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private moodleUrl = 'http://localhost/moodle/webservice/rest/server.php';
  private token = 'c686a242c8693cda4e5819e0c5445efe';

  constructor(
    private http: HttpClient
  ) { }

  // create fuction createCategory
  createCategory(nombre: string, id: number, descripcion: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_create_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('categories[0][name]', nombre);
    body.set('categories[0][idnumber]', id.toString());
    body.set('categories[0][description]', descripcion);

    const options = {
      headers,
    };

    return this.http.post(this.moodleUrl, body.toString(), options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError('Something bad happened; please try again later.');
  }


  // create function update 
  updateCategory(nombre: string, id: number, descripcion: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_update_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('categories[0][id]', id.toString());
    body.set('categories[0][name]', nombre);
    body.set('categories[0][description]', descripcion);

    const options = {
      headers,
    };

    return this.http.post(this.moodleUrl, body.toString(), options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // crate function delete
  deleteCategory(id: number): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', this.token);
    body.set('wsfunction', 'core_course_delete_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('categories[0][id]', id.toString());

    const options = {
      headers,
    };

    return this.http.post(this.moodleUrl, body.toString(), options)
      .pipe(
        catchError(this.handleError)
      );
  }

}
