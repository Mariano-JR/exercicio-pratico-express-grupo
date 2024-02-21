export class AppError {
    private _mensagem: string
    private _status: number

    constructor(mensagem: string , status: number = 400) {
        this._mensagem = mensagem
        this._status = status
    }

    get mensagem(): string {
        return this._mensagem
    }

    get status(): number {
        return this._status
    }
}