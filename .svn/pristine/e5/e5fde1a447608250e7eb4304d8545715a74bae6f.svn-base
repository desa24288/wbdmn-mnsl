import { Profile } from '../models/entity/usuario/profile';
import * as jwt_decode from 'jwt-decode';
export class Userprofile {
  private profile: Profile;
  public nomusuario = '';
  public rutusuario = '';

  constructor() {
    this.loadprofile();
    this.rutusuario = this.profile.RutUsuario;
    this.nomusuario = this.profile.NombreUsuario;
  }

 private  loadprofile() {
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadminminsal'));
    if (uiwebadmin !== null) {
      const decodedoken = this.getDecodedAccessToken(uiwebadmin.token);
      this.profile = new Profile();
      this.profile = decodedoken;
    }
  }
  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
    }
  }
}

