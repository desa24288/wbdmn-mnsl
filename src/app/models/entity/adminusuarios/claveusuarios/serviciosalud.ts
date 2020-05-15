export class Serviciosalud {
    NumServicioSalud: number;
    GloServicioSalud: string;

    constructor(
        NumServicioSalud?: number,
        GloServicioSalud?: string
    ) {
        this.NumServicioSalud = NumServicioSalud;
        this.GloServicioSalud = GloServicioSalud;
    }
}