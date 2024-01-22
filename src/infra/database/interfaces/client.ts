import { Client } from "../../../models/client"

export interface ClientRepositoryInterface {
    list(): Client[]
    findByCpf(cpf: string): Client | undefined
    save(client: Client): Client
}