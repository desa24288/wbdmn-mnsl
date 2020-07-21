export class Propiedadesclave {
    letrasnum: string;
    mincaracteres: number;
    passwordusadas: number;
    rutfuncionario: string;

    constructor(
        letrasnum?: string,
        mincaracteres?: number,
        passwordusadas?: number,
        rutfuncionario?: string
    ) {
        this.letrasnum = letrasnum;
        this.mincaracteres = mincaracteres;
        this.passwordusadas = passwordusadas;
        this.rutfuncionario = rutfuncionario;
    }
}
