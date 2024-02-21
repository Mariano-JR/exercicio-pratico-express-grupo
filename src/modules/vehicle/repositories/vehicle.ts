import { GetByIdVehicle, GetByPlateVehicle, ListVehicle, SaveVehicle } from "./i-vehicle"
import prisma from '../../../common/helpers/prisma-connection'

class VehicleRepository implements SaveVehicle, ListVehicle, GetByIdVehicle, GetByPlateVehicle {
  async save({ id, type, model, plate, dailyValue, licenseType, available }: SaveVehicle.Input): Promise<void> {
    await prisma.vehicle.create({
      data: { id, type, model, plate, daily_value: dailyValue, license_type: licenseType, available }
    })
  }

  async list({ licenseType, available }: ListVehicle.Input): Promise<ListVehicle.Output> {
    const where = {};
    if (licenseType) Object.assign(where, { license_type: licenseType })
    if (available !== null) Object.assign(where, { available })

    const vehicles = await prisma.vehicle.findMany({
      where,
      select: {
        id: true,
        type: true,
        model: true,
        plate: true,
        daily_value: true,
        license_type: true,
        available: true,
      }
    })
    if (vehicles !== null && vehicles !== undefined) {
      return vehicles.map((vehicle) => ({
        id: vehicle.id,
        type: vehicle.type,
        model: vehicle.model,
        plate: vehicle.plate,
        dailyValue: parseFloat(vehicle.daily_value.toString()),
        licenseType: vehicle.license_type,
        available: vehicle.available,
      }))
    }
  }

  async getById({ id }: GetByIdVehicle.Input): Promise<GetByIdVehicle.Output> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        type: true,
        model: true,
        plate: true,
        daily_value: true,
        license_type: true,
        available: true,
      }
    })
    if (vehicle !== null && vehicle !== undefined) {
      return {
        id: vehicle.id,
        type: vehicle.type,
        model: vehicle.model,
        plate: vehicle.plate,
        dailyValue: parseFloat(vehicle.daily_value.toString()),
        licenseType: vehicle.license_type,
        available: vehicle.available,
      }
    }
  }

  async getByPlate({ plate }: GetByPlateVehicle.Input): Promise<GetByPlateVehicle.Output> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate
      },
      select: {
        id: true,
        type: true,
        model: true,
        plate: true,
        daily_value: true,
        license_type: true,
        available: true,
      }
    })
    if (vehicle !== null && vehicle !== undefined) {
      return {
        id: vehicle.id,
        type: vehicle.type,
        model: vehicle.model,
        plate: vehicle.plate,
        dailyValue: parseFloat(vehicle.daily_value.toString()),
        licenseType: vehicle.license_type,
        available: vehicle.available,
      }
    }
  }
}

export const vehicleRepository = new VehicleRepository()
