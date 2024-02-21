import { AppError } from "../../../common/errors/app-error";
import { Vehicle } from "../entities/vehicle";
import { vehicleRepository } from "../repositories/vehicle";

class RegisterVehicleService {
  async execute({ type, model, plate, dailyValue }: Input) {
    const vehicleExists = await vehicleRepository.getByPlate({ plate })
    if (vehicleExists) throw new AppError("Placa já cadastrada")
    const newVehicle = Vehicle.create({ type, model, plate, dailyValue });
    await vehicleRepository.save(newVehicle)
    return newVehicle.id
  }
}

type Input = {
  type: string
  model: string
  plate: string
  dailyValue: number
}

export const registerVehicleService = new RegisterVehicleService()
