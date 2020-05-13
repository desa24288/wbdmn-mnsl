export class Ejecutable {
    CodEjecutable: number;
    NomEjecutable: string;
    Seleccionado_1: boolean;

    constructor(
        CodEjecutable?: number,
        NomEjecutable?: string,
        Seleccionado_1?: boolean
    ) {
        this.CodEjecutable = CodEjecutable;
        this.NomEjecutable = NomEjecutable;
        this.Seleccionado_1 = Seleccionado_1;
    }
}