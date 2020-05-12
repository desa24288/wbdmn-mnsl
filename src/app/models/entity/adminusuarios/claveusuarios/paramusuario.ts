export class Paramusuario {
    rut: string;
    nombre: string;
    estado: string;

    constructor(
        rut?: string,
        nombre?: string,
        estado?: string
    ) {
        this.rut = rut;
        this.nombre = nombre;
        this.estado = estado;
    }
}