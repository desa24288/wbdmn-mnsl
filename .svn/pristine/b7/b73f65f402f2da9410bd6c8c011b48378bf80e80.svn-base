import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Actualizarperfiles } from 'src/app/models/entity/adminusuarios/mantencionusuarios/actualizarperfiles';

@Injectable({
  providedIn: 'root'
})
export class MantencionusuariosService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/mantenedor/mantenedor');
  private TARGET_URL_PERFILES = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/perfil/perfil');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getNombreUsuario(rutusuario: string): Observable<string> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/nombreusuario/')
      .concat(rutusuario)
      , this.tokenService.get());
  }

  public getPerfilesDisponibles(rutusuario: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.TARGET_URL_PERFILES.concat('/perfiles/')
      .concat(rutusuario)
      , this.tokenService.get());
  }

  public getPerfilesUsuario(rutusuario: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.TARGET_URL_PERFILES.concat('/usuarioperfiles/')
      .concat(rutusuario)
      , this.tokenService.get());
  }

  public getCompinesDisponibles(rutusuario: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.TARGET_URL.concat('/compines/')
      .concat(rutusuario)
      , this.tokenService.get());
  }

  public getCompinesUsuario(rutusuario: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.TARGET_URL.concat('/usuariocompines/')
      .concat(rutusuario)
      , this.tokenService.get());
  }

  public postActualizarPerfiles(actualizarperfil: Actualizarperfiles): Observable<any> {
    return this.httpClient.post<Actualizarperfiles>(
      this.TARGET_URL_PERFILES.concat('/perfiles/'), actualizarperfil);
  }
}
