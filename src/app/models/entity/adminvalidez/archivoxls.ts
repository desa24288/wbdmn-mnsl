export class Archivoxls {
    CorrelArchivo: string;
    Fecha: string;
    Emisor: string;
    RutTrabajador: string;
    NomTrabajador: string;
    NroDictamen: string;
    CodTipoInvalidez: string;
    PorcentajeInvalidez: string;
    FechaEjecutoriado: string;
    FechaMaxApelacion: string;
    TieneDiagnostico: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo1: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo2: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo3: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo4: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo5: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo6: string;
    // tslint:disable-next-line: variable-name
    CIE10_Codigo7: string;
    TipoReclamo: string;

    constructor(
        CorrelArchivo?: string,
        Fecha?: string,
        Emisor?: string,
        RutTrabajador?: string,
        NomTrabajador?: string,
        NroDictamen?: string,
        CodTipoInvalidez?: string,
        PorcentajeInvalidez?: string,
        FechaEjecutoriado?: string,
        FechaMaxApelacion?: string,
        TieneDiagnostico?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo1?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo2?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo3?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo4?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo5?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo6?: string,
        // tslint:disable-next-line: variable-name
        CIE10_Codigo7?: string,
        TipoReclamo?: string
    ) {
        this.CorrelArchivo = CorrelArchivo;
        this.Fecha = Fecha;
        this.Emisor = Emisor;
        this.RutTrabajador = RutTrabajador;
        this.NomTrabajador = NomTrabajador;
        this.NroDictamen = NroDictamen;
        this.CodTipoInvalidez = CodTipoInvalidez;
        this.PorcentajeInvalidez = PorcentajeInvalidez;
        this.FechaEjecutoriado = FechaEjecutoriado;
        this.FechaMaxApelacion = FechaMaxApelacion;
        this.TieneDiagnostico = TieneDiagnostico;
        this.CIE10_Codigo1 = CIE10_Codigo1;
        this.CIE10_Codigo2 = CIE10_Codigo2;
        this.CIE10_Codigo3 = CIE10_Codigo3;
        this.CIE10_Codigo4 = CIE10_Codigo4;
        this.CIE10_Codigo5 = CIE10_Codigo5;
        this.CIE10_Codigo6 = CIE10_Codigo6;
        this.CIE10_Codigo7 = CIE10_Codigo7;
        this.TipoReclamo = TipoReclamo;
    }
}