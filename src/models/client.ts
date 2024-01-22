export class Client {
    public id: number = 0
    public name: string
    public cpf: string
    public license_type: string

    constructor(name: string, cpf: string, license_type: string) {
        this.name = name
        this.cpf = cpf
        this.license_type = license_type
    }
}