export class Paramusuario {
    Col_RutUsuario: string;
    Col_NombreUsuario: string;
    Col_CodEstadoUsuario: number;
    Col_GloEstadoUsuario: string;
    Col_CorreoUsuario: string;

    constructor(
        Col_RutUsuario?: string,
        Col_NombreUsuario?: string,
        Col_CodEstadoUsuario?: number,
        Col_GloEstadoUsuario?: string,
        Col_CorreoUsuario?: string
    ) {
        this.Col_RutUsuario = Col_RutUsuario;
        this.Col_NombreUsuario = Col_NombreUsuario;
        this.Col_CodEstadoUsuario = Col_CodEstadoUsuario;
        this.Col_CorreoUsuario = Col_CorreoUsuario;
    }
}