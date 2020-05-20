import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Paramusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/paramusuario';
import { Crearusuario } from 'src/app/models/entity/adminusuarios/claveusuarios/crearusuario';

@Injectable({
  providedIn: 'root'
})
export class ClaveusuariosService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/mantenedor/mantenedor');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getUsuario(serviciosalud: number, estadousuarios: number): Observable<Paramusuario[]> {
    return this.httpClient.get<Paramusuario[]>(
      this.TARGET_URL.concat('/usuarios/')
      .concat(serviciosalud.toString()).concat('/')
      .concat(estadousuarios.toString())
      , this.tokenService.get());
  }

  public bloquearUsuario(rut: string): Observable<any> {
    return this.httpClient.post<string>(
      this.TARGET_URL.concat('/bloquear_clave/'),
      { rutusuario: rut });
  }

  public deleteUsuario(rut: string): Observable<any> {
    return this.httpClient.post<string>(
      this.TARGET_URL.concat('/eliminar_usuario/'),
      { rutusuario: rut });
  }

  public crearUsuario(usuario: Crearusuario): Observable<Crearusuario> {
    return this.httpClient.post<Crearusuario>(
      this.TARGET_URL.concat('/usuario/'), usuario);
  }
}
