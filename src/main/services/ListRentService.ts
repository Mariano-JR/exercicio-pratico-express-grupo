import { clientsRepository } from "../../infra/database/repositories/client"
import { rentsRepository } from "../../infra/database/repositories/rent"
import { AppError } from "../errors/AppError"

class ListRentService {
    execute(cpf: string) {
        const client = clientsRepository.findByCpf(cpf)
        if(!client) throw new AppError("Cliente não encontrado", 404)

        const rents = rentsRepository.findByClientId(client.id)
        if(!rents) throw new AppError("Cliente não possui alugueis", 404)

        return rents
    }
}

export const listRentService = new ListRentService()