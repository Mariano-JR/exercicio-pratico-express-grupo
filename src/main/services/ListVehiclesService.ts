import { vehiclesRepository } from "../../infra/database/repositories/vehicle"

class ListVehiclesService {
    execute(licenseType: string, available: boolean) {
        const vehicles = vehiclesRepository.findByLicenseAndAvailable(licenseType, available)
        return vehicles
    }
}

export const listVehiclesService = new ListVehiclesService()