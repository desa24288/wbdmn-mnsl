import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Archivoxls } from 'src/app/models/entity/adminvalidez/archivoxls';

@Injectable({
  providedIn: 'root'
})
export class CargainvalidezService {
  private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
  .concat(environment.api.app).concat('/cargainvalidez/cargainvalidez/');
  constructor( private httpClient: HttpClient,
               private tokenService: TokenService) { }

  public insertar(arr: Array<Archivoxls>): Observable<any> {
    return this.httpClient.post(
      this.TARGET_URL.concat('insertar'), { licencias: arr }, this.tokenService.post()
    );
  }
}
