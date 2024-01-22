import { clientsRepository } from "../../infra/database/repositories/client"

class ListClientsService{
    execute() {
        return clientsRepository.list()
    }
}

export const listClientsService = new ListClientsService()