import { Rol } from './rol';
import { Serviciosalud } from '../parametros/serviciosalud';

export class Profile {
  usuario: string;
  nombre: string;
  estado: string; // Estado usuario
  clavecad: string; // Si clave expiro respecto a los dias permitidos
  fechaupd: string;
  sucursales: Array<Serviciosalud>;
  perfiles: Array<Rol>;
  // RutUsuario: string;
  // NombreUsuario: string;
  // EMail: string;
  // Telefono: number;
  // IdTipoUsuario: number;
  // GloTipoUsuario: string;
  // IdEstadoUsuario: number;
  // GloEstadoUsuario: string;
  // Roles: Array<Rol>;

  constructor(
    usuario?: string,
    nombre?: string,
    estado?: string,
    clavecad?: string,
    fechaupd?: string,
    sucursales?: Array<Serviciosalud>,
    perfiles?: Array<Rol>
    // RutUsuario?: string,
    // NombreUsuario?: string,
    // EMail?: string,
    // Telefono?: number,
    // IdTipoUsuario?: number,
    // GloTipoUsuario?: string,
    // IdEstadoUsuario?: number,
    // GloEstadoUsuario?: string,
    // Roles?: Array<Rol>
  ) {
    this.usuario = usuario;
    this.nombre = nombre;
    this.estado = estado;
    this.clavecad = clavecad;
    this.fechaupd = fechaupd;
    this.sucursales = sucursales;
    this.perfiles = perfiles;
    // this.RutUsuario = RutUsuario;
    // this.NombreUsuario = NombreUsuario;
    // this.EMail = EMail;
    // this.Telefono = Telefono;
    // this.IdTipoUsuario = IdTipoUsuario;
    // this.GloTipoUsuario = GloTipoUsuario;
    // this.IdEstadoUsuario = IdEstadoUsuario;
    // this.GloEstadoUsuario = GloEstadoUsuario;
    // this.Roles = Roles;
  }
}
