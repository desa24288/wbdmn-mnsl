import { Profile } from '../models/entity/usuario/profile';
import * as jwt_decode from 'jwt-decode';
import { Rol } from '../models/entity/usuario/rol';

export class Userprofile {
  private profile: Profile;
  public nomusuario = '';
  public rutusuario = '';
  public estadousuario = '';
  public rol: Array<Rol> = [];
  public rolobj: Rol;

  constructor() {
    this.loadprofile();
    this.rutusuario = this.profile.usuario;
    this.nomusuario = this.profile.nombre;
    this.estadousuario = this.profile.estado;
    this.rol.push(this.rolobj);
  }

 private  loadprofile() {
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadminminsal'));
    if (uiwebadmin !== null) {
      const decodedoken = this.getDecodedAccessToken(uiwebadmin.token);
      this.profile = new Profile();
      this.profile = decodedoken;

      for (const lrol of this.profile.perfiles) {
        this.rolobj = lrol;
        break;
      }
    }
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
    }
  }
}

