export class Crearusuario {
    rutusuario: string;
    nombre: string;
    correo: string;

    constructor (
        rutusuario?: string,
        nombre?: string,
        correo?: string
    ) {
        this.rutusuario = rutusuario;
        this.nombre = nombre;
        this.correo = correo;
    }
}