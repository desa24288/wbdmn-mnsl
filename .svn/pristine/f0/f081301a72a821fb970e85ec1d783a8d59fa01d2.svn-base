import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Actualizarpropiedades } from 'src/app/models/entity/adminusuarios/propiedadescuenta/actualizarpropiedades';

@Injectable({
  providedIn: 'root'
})

export class PropiedadescuentaService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/propiedades/propiedades');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getPropiedades(idregla: number): Observable<Actualizarpropiedades> {
    return this.httpClient.get<Actualizarpropiedades>(
      this.TARGET_URL.concat('/propiedades/')
      .concat(idregla.toString())
      , this.tokenService.get());
  }

  public putActualizarpropiedades(propiedades: Actualizarpropiedades): Observable<any> {
    return this.httpClient.put<string>(
      this.TARGET_URL.concat('/actualizar/'), propiedades);
  }
}
