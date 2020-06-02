import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Ejecutable } from 'src/app/models/entity/adminperfiles/ejecutable';
import { Perfiles } from 'src/app/models/entity/adminperfiles/perfiles';
import { Actualizar } from 'src/app/models/entity/adminperfiles/actualizar';

@Injectable({
  providedIn: 'root'
})
export class PerfilamientomodulosService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/rol/rol');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getPerfiles(): Observable<any> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/roles/')
      , this.tokenService.get());
  }

  public getEjecutables(idrol: number): Observable<any> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/ejecutables/')
      .concat(idrol.toString())
      , this.tokenService.get());
  }

  public getMenu(execname: string, idrol: number): Observable<any> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/menu/')
      .concat(execname).concat('/')
      .concat(idrol.toString())
      , this.tokenService.get());
  }

  public putActualizarPerfil(ejecutable: Actualizar): Observable<any> {
    return this.httpClient.put<Actualizar>(
      this.TARGET_URL.concat('/ejecutable/'), ejecutable);
  }
}
