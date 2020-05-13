export class Perfil {
    CodPerfil: number;
    GloPerfil: string;

    constructor(
        CodPerfil?: number,
        GloPerfil?: string,
    ) {
        this.CodPerfil = CodPerfil;
        this.GloPerfil = GloPerfil;
    }
}