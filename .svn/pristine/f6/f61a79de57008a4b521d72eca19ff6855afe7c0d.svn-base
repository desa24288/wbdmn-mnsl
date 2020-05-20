import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Estadousuario } from 'src/app/models/entity/adminusuarios/claveusuarios/estadousuario';
import { Serviciosalud } from 'src/app/models/entity/adminusuarios/claveusuarios/serviciosalud';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
  .concat(environment.api.app).concat('/parametro/parametro');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public estadoUsuario(): Observable<Estadousuario[]> {
    return this.httpClient.get<Estadousuario[]>(
      this.TARGET_URL.concat('/estado_usuario')
      , this.tokenService.get());
  }

  public servicioSalud(): Observable<Serviciosalud[]> {
    return this.httpClient.get<Serviciosalud[]>(
      this.TARGET_URL.concat('/servicio_salud')
      , this.tokenService.get());
  }
}
