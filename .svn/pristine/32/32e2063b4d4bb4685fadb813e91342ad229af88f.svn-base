import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './utils/token.service';
import { Adjunto } from '../models/entity/adjunto/adjunto';

@Injectable({
  providedIn: 'root'
})
export class AdjuntosportalService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
    .concat(environment.api.app).concat('/portal/adjuntos/');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getConsultafoliobono(foliobono: string):
    Observable<Adjunto[]> {
    return this.httpClient.get<Adjunto[]>(
      this.TARGET_URL.concat('foliobono/')
        .concat(foliobono.toString())
      , this.tokenService.get()
    );
  }

  public getConsultadesdehasta(fechadesde: string, fechahasta: string):
    Observable<Adjunto[]> {
    return this.httpClient.get<Adjunto[]>(
      this.TARGET_URL.concat('fechaemision/')
        .concat(fechadesde.toString()).concat('/')
        .concat(fechahasta.toString()).concat('/')
      , this.tokenService.get()
    );
  }

  public getConsultarutprestadorfecha(rutprestador: string, fechadesde: string, fechahasta: string):
    Observable<Adjunto[]> {
    return this.httpClient.get<Adjunto[]>(
      this.TARGET_URL.concat('fecharutprestador/')
        .concat(rutprestador.toString()).concat('/')
        .concat(fechadesde.toString()).concat('/')
        .concat(fechahasta.toString())
      , this.tokenService.get()
    );
  }

  public getConsultarutbeneficiariofecha(rutbeneficiario: string, fechadesde: string, fechahasta: string):
    Observable<Adjunto[]> {
    return this.httpClient.get<Adjunto[]>(
      this.TARGET_URL.concat('fecharutbeneficiario/')
        .concat(rutbeneficiario.toString()).concat('/')
        .concat(fechadesde.toString()).concat('/')
        .concat(fechahasta.toString())
      , this.tokenService.get()
    );
  }

  public getDocumento(idadjunto: number): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL.concat('adjuntoid/')
        .concat(idadjunto.toString()),
      {
        headers: this.tokenService.getBlob(),
        responseType: 'blob' as 'json',
        observe: 'response'
      }
    );
  }
}
