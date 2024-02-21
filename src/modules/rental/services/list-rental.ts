import { clientsRepository } from "../../client/repositories/client"
import { rentsRepository } from "../repositories/rental"
import { AppError } from "../../../common/errors/app-error"

class ListRentalService {
  async execute({ cpf }: Input) {
    const clientExists = await clientsRepository.getByCpf({ cpf })
    if (!clientExists) throw new AppError("Cliente não encontrado", 404)

    const rentalsExists = await rentsRepository.getByClientId({ clientId: clientExists.id })
    if (!rentalsExists) throw new AppError("Cliente não possui alugueis", 404)

    return rentalsExists
  }
}

type Input = {
  cpf: string
}

export const listRentalService = new ListRentalService()
