export class Actualizarpropiedades {
    ID_REGLA: number;
    // tslint:disable-next-line: variable-name
    ID_Componente: string;
    SW_UPD_PWD1: string;
    SW_UPD_PWD2: number;
    SW_LEN_PWD: number;
    SW_TYP_PWD: string;
    SW_INT_BLQ: number;
    SW_PWD_UNI: number;

    constructor(
        ID_REGLA?: number,
        // tslint:disable-next-line: variable-name
        ID_Componente?: string,
        SW_UPD_PWD1?: string,
        SW_UPD_PWD2?: number,
        SW_LEN_PWD?: number,
        SW_TYP_PWD?: string,
        SW_INT_BLQ?: number,
        SW_PWD_UNI?: number
    ) {
        this.ID_REGLA = ID_REGLA;
        this.ID_Componente = ID_Componente;
        this.SW_UPD_PWD1 = SW_UPD_PWD1;
        this.SW_UPD_PWD2 = SW_UPD_PWD2;
        this.SW_LEN_PWD = SW_LEN_PWD;
        this.SW_TYP_PWD = SW_TYP_PWD;
        this.SW_INT_BLQ = SW_INT_BLQ;
        this.SW_PWD_UNI = SW_PWD_UNI;
    }
}