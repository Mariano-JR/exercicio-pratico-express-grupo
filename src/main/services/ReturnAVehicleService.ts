import { rentsRepository } from "../../infra/database/repositories/rent"
import { AppError } from "../errors/AppError"

class ReturnAVehicleService {
    execute(id: number) {
        const rent = rentsRepository.findById(id)

        if(!rent) throw new AppError("Aluguel não encontrado", 404)

        return rentsRepository.updateReturn(rent)
    }
}

export const returnAVehicleService = new ReturnAVehicleService()