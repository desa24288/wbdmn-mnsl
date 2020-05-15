export class Estadousuario {
    CodEstadoUsr: number;
    GloEstadoUsr: string;

    constructor(
        CodEstadoUsr?: number,
        GloEstadoUsr?: string
    ) {
        this.CodEstadoUsr = CodEstadoUsr;
        this.GloEstadoUsr = GloEstadoUsr;
    }
}