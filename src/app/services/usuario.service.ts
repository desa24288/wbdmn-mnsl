import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './utils/token.service';
import { Login } from '../models/entity/usuario/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/usuarios/autenticacion');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public auth(login: Login): Observable<any> {
    return this.httpClient.post<Login>(this.TARGET_URL.concat('/login'), login);
  }

  public islogin(): Promise<any> {
    return this.httpClient.get<any>(this.TARGET_URL.concat('/islogin'), this.tokenService.get()).toPromise();
  }

  public logout(): Observable<any> {
    return this.httpClient.get<any>(this.TARGET_URL.concat('/logout'), this.tokenService.get());
  }

  public getIntentoslog(aplicativo: string, rutusuario: string, conectado: number, bloqueo = 0): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL.concat('/intentoslog/')
      .concat(aplicativo).concat('/')
      .concat(rutusuario).concat('/')
      .concat(conectado.toString()).concat('/')
      .concat(bloqueo.toString())
      , this.tokenService.get());
  }

  public diasclave(rutusuario: string): Observable<any> {
    return this.httpClient.get<any>(this.TARGET_URL.concat('/clavexpira/').
    concat(rutusuario), this.tokenService.get());
  }
}
