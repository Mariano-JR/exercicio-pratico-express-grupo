import { Rental } from "../entities/rental"
import { AppError } from "../../../common/errors/app-error"
import { rentsRepository } from "../repositories/rental"
import { clientsRepository } from "../../client/repositories/client"
import { vehicleRepository } from "../../vehicle/repositories/vehicle"
import { RentalStatusEnum } from "../../../common/enums"

class RentalVehicleService {
  async execute({ cpf, plate }: Input) {
    const clientExists = await clientsRepository.getByCpf({ cpf })
    if (!clientExists) throw new AppError("Cliente não encontrado", 404)

    const vehicleExists = await vehicleRepository.getByPlate({ plate })
    if (!vehicleExists) throw new AppError("Veiculo não encontrado", 404)

    const clientHasARental = await rentsRepository.getByClientIdAndStatus({
      clientId: clientExists.id, status: RentalStatusEnum.PROGRESS
    })
    if (clientHasARental) throw new AppError("Este cliente já tem um aluguel em andamento!", 404)

    const rentedVehicle = await rentsRepository.getByVehicleIdAndStatus({
      vehicleId: vehicleExists.id, status: RentalStatusEnum.PROGRESS
    })
    if (rentedVehicle) throw new AppError("Este veículo já está alugado!", 404)

    const newRental = Rental.create({
      clientId: clientExists.id, vehicleId: vehicleExists.id, dailyValue: vehicleExists.dailyValue
    })
    await rentsRepository.save(newRental)
    return newRental.id
  }
}

type Input = {
  cpf: string
  plate: string
}

export const rentalVehicleService = new RentalVehicleService()
