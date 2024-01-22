import { Vehicle } from "../../../models/vehicle"

export interface VehicleRepositoryInterface {
    listByFilter(filter: boolean): Vehicle[]
    findById(id: number): Vehicle | undefined
    findByPlate(plate: string): Vehicle | undefined
    findByLicenseAndAvailable(license: string, available: boolean): Vehicle[] | undefined
    save(vehicle: Vehicle): Vehicle
}