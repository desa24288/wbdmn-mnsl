import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Invalidez } from 'src/app/models/entity/adminvalidez/invalidez';

@Injectable({
  providedIn: 'root'
})
export class GestioninvalidezService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
  .concat(environment.api.app).concat('/cargainvalidez/gestion');
  constructor( private httpClient: HttpClient,
               private tokenService: TokenService) { }

  public getInvfecha(FechaInicio: string, FechaTermino: string): Observable<Invalidez[]> {
  return this.httpClient.get<Invalidez[]>(
    this.TARGET_URL.concat('/buscafecha/')
    .concat(FechaInicio).concat('/')
    .concat(FechaTermino)
    , this.tokenService.get());
  }

  public getInvrut(RutTrabajador: string): Observable<Invalidez[]> {
    return this.httpClient.get<Invalidez[]>(
      this.TARGET_URL.concat('/buscarut/')
      .concat(RutTrabajador)
      , this.tokenService.get());
  }

  public deleteInvrut(rut: string): Observable<any> {
    return this.httpClient.delete<any>(
      this.TARGET_URL.concat('/borrarut/')
        .concat(rut.toString())
      , this.tokenService.delete()
    );
  }
}

