export class Invalidez {
    ID: string;
    CorrelArchivo: string;
    Fecha: Date;
    Emisor: string;
    RutTrabajador: string;
    NomTrabajador: string;
    NroDictamen: string;
    CodTipoInvalidez: string;
    PorcentajeInvalidez: string;
    FechaEjecutoriado: Date;
    FechaMaxApelacion: Date;
    TieneDiagnostico: string;
    TipoReclamo: string;
    // tslint:disable-next-line: variable-name
    sw_cartola: string;
    // tslint:disable-next-line: variable-name
    sw_trabe: string;
    // tslint:disable-next-line: variable-name
    Cod_Cybl: string;
    NombrePaciente: string;
    FechaDefuncion: Date;
    PrcEstado: string;
    PrcFecha: Date;
    FechaCarga: string;

    constructor(
        ID?: string,
        CorrelArchivo?: string,
        Fecha?: Date,
        Emisor?: string,
        RutTrabajador?: string,
        NomTrabajador?: string,
        NroDictamen?: string,
        CodTipoInvalidez?: string,
        PorcentajeInvalidez?: string,
        FechaEjecutoriado?: Date,
        FechaMaxApelacion?: Date,
        TieneDiagnostico?: string,
        TipoReclamo?: string,
        // tslint:disable-next-line: variable-name
        sw_cartola?: string,
        // tslint:disable-next-line: variable-name
        sw_trabe?: string,
        // tslint:disable-next-line: variable-name
        Cod_Cybl?: string,
        NombrePaciente?: string,
        FechaDefuncion?: Date,
        PrcEstado?: string,
        PrcFecha?: Date,
        FechaCarga?: string,
    ) {
        this.ID = ID;
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
        this.TipoReclamo = TipoReclamo;
        this.sw_cartola = sw_cartola;
        this.sw_trabe = sw_trabe;
        this.Cod_Cybl = Cod_Cybl;
        this.NombrePaciente = NombrePaciente;
        this.FechaDefuncion = FechaDefuncion;
        this.PrcEstado = PrcEstado;
        this.PrcFecha = PrcFecha;
        this.FechaCarga = FechaCarga;
    }
}