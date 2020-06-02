export class Menuperfilamiento {
    Estado: string;
    jerarquia: string;
    // tslint:disable-next-line: variable-name
    ID_Menu: string;
    // tslint:disable-next-line: variable-name
    DS_Menu: string;
    // tslint:disable-next-line: variable-name
    SW_Privilegio: number;
    // tslint:disable-next-line: variable-name
    SW_Depend: number;
    // tslint:disable-next-line: variable-name
    Seleccionado_1: boolean;

    constructor(
        Estado?: string,
        jerarquia?: string,
        // tslint:disable-next-line: variable-name
        ID_Menu?: string,
        // tslint:disable-next-line: variable-name
        DS_Menu?: string,
        // tslint:disable-next-line: variable-name
        SW_Privilegio?: number,
        // tslint:disable-next-line: variable-name
        SW_Depend?: number,
        // tslint:disable-next-line: variable-name
        Seleccionado_1?: boolean
    ) {
        this.Estado = Estado;
        this.jerarquia = jerarquia;
        this.ID_Menu = ID_Menu;
        this.DS_Menu = DS_Menu;
        this.SW_Privilegio = SW_Privilegio;
        this.SW_Depend = SW_Depend;
        this.Seleccionado_1 = Seleccionado_1;
    }
}
