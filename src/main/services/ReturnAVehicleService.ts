import { Rent } from "../../models/rent"
import { AppError } from "../errors/AppError"
import { rentsRepository } from "../../infra/database/repositories/rent"
import { vehiclesRepository } from "../../infra/database/repositories/vehicle"

class ReturnAVehicleService {
    execute(id: number) {
        const rent = rentsRepository.findById(id)
        if(!rent) throw new AppError("Aluguel não encontrado", 404)

        const vehicle = vehiclesRepository.findById(rent.vehicle_id)
        if(!vehicle) throw new AppError("Veiculo não encontrado", 404)

        const update = Rent.return(rent, vehicle.license_type)

        return rentsRepository.updateReturn(update)
    }
}

export const returnAVehicleService = new ReturnAVehicleService()