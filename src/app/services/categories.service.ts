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

  /**
   * list all categories
   */
  getAllCategories(): Observable<any[]> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
    console.log('url del servicio',url)
  }

  /**
   * get category by id
   */
  getCategoryDetails(categoryId: number): Observable<any> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`;
    return this.http.get<any>(`${url}&categoryid=${categoryId}`);
  }

  /**
   * crate function to edit category
   */
  editCategory(id: number, nombre: string,  descripcion: string): Observable<any> {
    const url = `${this.moodleUrl}/webservice/rest/server.php?wstoken=${this.token}&wsfunction=core_course_update_categories&moodlewsrestformat=json`;
    const data = {
      categories: [
        {
          id: id,
          name: nombre,
          description: descripcion
        }
      ]
    };
    return this.http.post<any>(url, data);
  }
}
