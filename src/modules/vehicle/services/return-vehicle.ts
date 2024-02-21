import { Rental } from "../../rental/entities/rental"
import { AppError } from "../../../common/errors/app-error"
import { rentsRepository } from "../../rental/repositories/rental"
import { vehicleRepository } from "../repositories/vehicle"

class ReturnVehicleService {
  async execute({ id }: Input) {
    const rentalExists = await rentsRepository.getById({ id })
    if (!rentalExists) throw new AppError("Aluguel não encontrado", 404)

    const vehicleExists = await vehicleRepository.getById({ id: rentalExists.vehicleId })
    if (!vehicleExists) throw new AppError("Veiculo não encontrado", 404)

    const rentalReturn = Rental.return(rentalExists, vehicleExists.licenseType)
    await rentsRepository.returnVehicle({
      id: rentalReturn.id,
      returnDate: rentalReturn.returnDate as Date,
      amount: rentalReturn.amount,
      status: rentalReturn.status,
      vehicleId: rentalReturn.vehicleId
    })
  }
}

type Input = {
  id: string
}

export const returnVehicleService = new ReturnVehicleService()
