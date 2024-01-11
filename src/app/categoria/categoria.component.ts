import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  
  nombreCategoria: string = '';
  idCategoria: number = 0;
  descripcionCategoria: string = '';

  constructor(private http: HttpClient) {}

  crearCategoria() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('wstoken', 'c686a242c8693cda4e5819e0c5445efe'); // Token de autenticación
    body.set('wsfunction', 'core_course_create_categories');
    body.set('moodlewsrestformat', 'json');
    body.set('categories[0][name]', this.nombreCategoria);
    body.set('categories[0][idnumber]', this.idCategoria.toString());
    body.set('categories[0][description]', this.descripcionCategoria);

    const options = {
      headers,
    };

    this.http.post(`http://localhost/moodle/webservice/rest/server.php`, body.toString(), options)
      .subscribe(response => {
        console.log('Categoría creada con éxito:', response);
      }, error => {
        console.error('Error al crear la categoría:', error);
      });
  }
}
