import { AppError } from "../errors/AppError";
import { Vehicle } from "../../models/vehicle";
import { vehiclesRepository } from "../../infra/database/repositories/vehicle";

class RegisterVehicleService {
    execute(vehicle: Vehicle) {
        const vehicleExist = vehiclesRepository.findByPlate(vehicle.plate)
        if(vehicleExist) throw new AppError("Placa já cadastrado")

        const newVehicle = vehiclesRepository.save(vehicle)
        return newVehicle
    }
}

export const registerVehicleService = new RegisterVehicleService()