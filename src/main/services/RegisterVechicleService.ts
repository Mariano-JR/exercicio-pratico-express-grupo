import { vehiclesRepository } from "../../infra/database/repositories/vehicle";
import { Vehicle } from "../../models/vehicle";

class RegisterVehicleService {
    execute(vehicle: Vehicle) {
        const newVehicle = vehiclesRepository.save(vehicle)
        return newVehicle
    }
}

export const registerVehicleService = new RegisterVehicleService()