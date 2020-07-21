import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Cambiarpass } from 'src/app/models/entity/usuario/cambiarpass';

@Injectable({
  providedIn: 'root'
})

export class CambiarpasswordService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/usuarios/cambiarpassword');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getHistClaves(rutusuario: string, cantidad: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.TARGET_URL.concat('/histclaves/')
      .concat(rutusuario).concat('/').concat(cantidad.toString())
      , this.tokenService.get());
  }

  public postCambioClave(cambiopass: Cambiarpass): Observable<Cambiarpass> {
    return this.httpClient.post<Cambiarpass>(
      this.TARGET_URL.concat('/cambiarclave'), cambiopass
      , this.tokenService.post());
  }
}
