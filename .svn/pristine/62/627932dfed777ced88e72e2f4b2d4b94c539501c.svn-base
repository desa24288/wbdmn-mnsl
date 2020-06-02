import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
/* Models */
import { Modificarperfil } from 'src/app/models/entity/adminperfiles/modificarperfil';

@Injectable({
  providedIn: 'root'
})
export class MantenedorperfilesService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/rol/perfil');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getEstados(): Observable<any> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/estado')
      , this.tokenService.get());
  }

  public getTipos(): Observable<any> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/tipo/')
      , this.tokenService.get());
  }

  public getPerfil(idrol: number): Observable<any> {
    return this.httpClient.get<string>(
      this.TARGET_URL.concat('/perfil/')
      .concat(idrol.toString())
      , this.tokenService.get());
  }

  public putActualizarperfil(modificar: Modificarperfil): Observable<any> {
    return this.httpClient.put<Modificarperfil>(
      this.TARGET_URL.concat('/actualizar/'), modificar,
      this.tokenService.put());
  }
}
