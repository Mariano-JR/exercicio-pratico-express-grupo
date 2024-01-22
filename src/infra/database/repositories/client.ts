import { clientsTable } from "../tables"
import { Client } from "../../../models/client"
import { ClientRepositoryInterface } from "../interfaces/client"

export class ClientRepository implements ClientRepositoryInterface {
    public list(): Client[] {
        return clientsTable
    }

    public findByCpf(cpf: string): Client | undefined {
        const client = clientsTable.find((client) => client.cpf == cpf)
        return client
    }

    public save(client: Client): Client {
        client.id = clientsTable.length > 0 ? clientsTable[clientsTable.length - 1].id + 1 : 1
        clientsTable.push(client)
        return client
    }
}

export const clientsRepository = new ClientRepository()
