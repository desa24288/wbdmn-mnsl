import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './utils/token.service';
import { Login } from '../models/entity/usuario/login';
import { Observable } from 'rxjs';
import { Claves } from 'src/app/models/entity/usuario/claves';

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

  public getIntentosbloq(rutusuario: string, aplicativo: string): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL.concat('/intentosbloq/')
      .concat(rutusuario).concat('/')
      .concat(aplicativo)
      , this.tokenService.get());
  }
}
