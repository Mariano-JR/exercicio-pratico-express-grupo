import { clientsRepository } from "../repositories/client"

class ListClientsService {
  async execute() {
    return await clientsRepository.list()
  }
}

export const listClientsService = new ListClientsService()
