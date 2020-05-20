export class Crearusuario {
    rutusuario: string;
    nombre: string;

    constructor (
        rutusuario?: string,
        nombre?: string
    ) {
        this.rutusuario = rutusuario;
        this.nombre = nombre;
    }
}