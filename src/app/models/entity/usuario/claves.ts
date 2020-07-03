export class Claves {
    Correlativo: number;
    Estado: number;
    Clave: string;

    constructor(
        Correlativo?: number,
        Estado?: number,
        Clave?: string
    ) {
        this.Correlativo = Correlativo;
        this.Estado = Estado;
        this.Clave = Clave;
    }
}
