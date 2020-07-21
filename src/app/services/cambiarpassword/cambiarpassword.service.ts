import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Cambiarpass } from 'src/app/models/entity/usuario/cambiarpass';
import { Enviarmail } from 'src/app/models/entity/usuario/enviarmail';

@Injectable({
  providedIn: 'root'
})

export class CambiarpasswordService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/usuarios/cambiarpassword');

    private TARGET_URL_MAIL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/usuarios/reestablecerpass');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public postCambioClave(cambiopass: Cambiarpass): Observable<Cambiarpass> {
    return this.httpClient.post<Cambiarpass>(
      this.TARGET_URL.concat('/cambiarclave'), cambiopass
      , this.tokenService.post());
  }

  public getEnviarmail(rutusuario, mail): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL_MAIL.concat('/mail/').
      concat(rutusuario.concat('/')).concat(mail)
      , this.tokenService.get());
  }

  public postEnviarmail(email: any): Observable<any> {
    return this.httpClient.post<any>(
      this.TARGET_URL_MAIL.concat('/mail/'), {
        EmailContacto: email
      }
      , this.tokenService.post());
  }
}
