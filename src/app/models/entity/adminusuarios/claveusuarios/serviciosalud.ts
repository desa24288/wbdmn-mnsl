export class Serviciosalud {
    CodServiciosalud: number;
    GloServiciosalud: string;

    constructor(
        CodServiciosalud?: number,
        GloServiciosalud?: string
    ) {
        this.CodServiciosalud = CodServiciosalud;
        this.GloServiciosalud = GloServiciosalud;
    }
}