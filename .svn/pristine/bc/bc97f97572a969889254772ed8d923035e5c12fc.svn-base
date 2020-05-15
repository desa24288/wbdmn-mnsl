import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */

@Injectable({
  providedIn: 'root'
})
export class ClaveusuariosService {

  constructor() { }

  public buscarUsuarios(serviciosalud: any): Observable<any> {
    try {
      return serviciosalud;
    } catch (err) {
      console.log('usuario', serviciosalud, ' no encontrado :(');
    }
  }

  public deleteUsuario(rut: any): Observable<any> {
    try {
      return rut;
    } catch (err) {
      console.log('Error en la acción');
    }
  }
}
