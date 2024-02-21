import { vehicleRepository } from "../repositories/vehicle"
import { formatToBoolean } from '../../../common/helpers/boolean';

class ListVehiclesService {
  async execute({ licenseType, available: availableString }: Input) {
    let available = availableString ? formatToBoolean(availableString) : null
    const vehicles = await vehicleRepository.list({ licenseType, available })
    return vehicles
  }
}
type Input = {
  licenseType: string | null
  available: string | null
}

export const listVehiclesService = new ListVehiclesService()
