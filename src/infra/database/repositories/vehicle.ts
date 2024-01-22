import { vehiclesTable } from "../tables"
import { Vehicle } from "../../../models/vehicle"
import { VehicleRepositoryInterface } from "../interfaces/vehicle"

class VehicleRepository implements VehicleRepositoryInterface {
    public listByFilter(filter: boolean): Vehicle[] {
        const vehicles = vehiclesTable.filter(
            (vehicle) => vehicle.available == filter
        )
        return vehicles
    }

    public findById(id: number): Vehicle | undefined {
        const vehicle = vehiclesTable.find((vehicle) => vehicle.id == id)
        return vehicle
    }

    public findByPlate(plate: string): Vehicle | undefined {
        const vehicle = vehiclesTable.find((vehicle) => vehicle.plate == plate)
        return vehicle
    }

    public findByLicenseAndAvailable(license: string, available: boolean): Vehicle[] | undefined {
        const vehicles = vehiclesTable.filter(
            (vehicle) => vehicle.license_type == license && vehicle.available == available
        )
        return vehicles
    }

    public save(vehicle: Vehicle): Vehicle {
        vehicle.id = vehiclesTable.length > 0 ? vehiclesTable[vehiclesTable.length - 1].id + 1 : 1
        vehiclesTable.push(vehicle)
        return vehicle
    }
}

export const vehiclesRepository = new VehicleRepository()
