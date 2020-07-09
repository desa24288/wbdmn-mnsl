export class Cambiarpass {
    user: string;
    provisoria: string;
    newpassword: string;

    constructor(
        user?: string,
        provisoria?: string,
        newpassword?: string
    ) {
        this.user = user;
        this.provisoria = provisoria;
        this.newpassword = newpassword;
    }
}