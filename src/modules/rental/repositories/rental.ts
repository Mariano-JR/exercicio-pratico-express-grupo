import { GetByClientIdAndStatusRent, GetByClientIdRent, GetByIdRent, GetByVehicleIdAndStatusRent, ReturnVehicleRent, SaveRent } from './i-rental'
import prisma from '../../../common/helpers/prisma-connection'

class RentalRepository implements SaveRent, ReturnVehicleRent, GetByIdRent, GetByClientIdRent, GetByVehicleIdAndStatusRent, GetByClientIdAndStatusRent {
  async save({ id, clientId, vehicleId, dailyValue, startDate, returnDate, amount, status }: SaveRent.Input): Promise<void> {
    await prisma.rental.create({
      data: {
        id,
        client_id: clientId,
        vehicle_id: vehicleId,
        daily_value: dailyValue,
        start_date: startDate,
        return_date: returnDate,
        amount,
        status
      }
    })
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { available: false }
    })
  }

  async returnVehicle({ id, returnDate, amount, status, vehicleId }: ReturnVehicleRent.Input): Promise<void> {
    await prisma.rental.update({
      where: { id }, data: { return_date: returnDate, amount, status }
    })
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { available: true }
    })
  }

  async getById({ id }: GetByIdRent.Input): Promise<GetByIdRent.Output> {
    const rental = await prisma.rental.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        client_id: true,
        vehicle_id: true,
        daily_value: true,
        start_date: true,
        return_date: true,
        amount: true,
        status: true,
      }
    })
    if (rental !== null && rental !== undefined) {
      return {
        id: rental.id,
        clientId: rental.client_id,
        vehicleId: rental.vehicle_id,
        dailyValue: parseFloat(rental.daily_value.toString()),
        startDate: rental.start_date,
        returnDate: rental.return_date,
        amount: parseFloat(rental.amount.toString()),
        status: rental.status,
      }
    }
  }

  async getByClientId({ clientId }: GetByClientIdRent.Input): Promise<GetByClientIdRent.Output> {
    const rentals = await prisma.rental.findMany({
      where: {
        client_id: clientId
      },
      select: {
        id: true,
        client_id: true,
        vehicle_id: true,
        daily_value: true,
        start_date: true,
        return_date: true,
        amount: true,
        status: true,
      }
    })
    if (rentals !== null && rentals !== undefined) {
      return rentals.map((rental) => ({
        id: rental.id,
        clientId: rental.client_id,
        vehicleId: rental.vehicle_id,
        dailyValue: parseFloat(rental.daily_value.toString()),
        startDate: rental.start_date,
        returnDate: rental.return_date,
        amount: parseFloat(rental.amount.toString()),
        status: rental.status,
      }))
    }
  }

  async getByVehicleIdAndStatus({ vehicleId, status }: GetByVehicleIdAndStatusRent.Input): Promise<GetByVehicleIdAndStatusRent.Output> {
    const rental = await prisma.rental.findFirst({
      where: {
        vehicle_id: vehicleId,
        status,
      },
      select: {
        id: true,
        client_id: true,
        vehicle_id: true,
        daily_value: true,
        start_date: true,
        return_date: true,
        amount: true,
        status: true,
      }
    })
    if (rental !== null && rental !== undefined) {
      return {
        id: rental.id,
        clientId: rental.client_id,
        vehicleId: rental.vehicle_id,
        dailyValue: parseFloat(rental.daily_value.toString()),
        startDate: rental.start_date,
        returnDate: rental.return_date,
        amount: parseFloat(rental.amount.toString()),
        status: rental.status,
      }
    }
  }


  async getByClientIdAndStatus({ clientId, status }: GetByClientIdAndStatusRent.Input): Promise<GetByClientIdAndStatusRent.Output> {
    const rental = await prisma.rental.findFirst({
      where: {
        client_id: clientId,
        status,
      },
      select: {
        id: true,
        client_id: true,
        vehicle_id: true,
        daily_value: true,
        start_date: true,
        return_date: true,
        amount: true,
        status: true,
      }
    })
    if (rental !== null && rental !== undefined) {
      return {
        id: rental.id,
        clientId: rental.client_id,
        vehicleId: rental.vehicle_id,
        dailyValue: parseFloat(rental.daily_value.toString()),
        startDate: rental.start_date,
        returnDate: rental.return_date,
        amount: parseFloat(rental.amount.toString()),
        status: rental.status,
      }
    }
  }
}

export const rentsRepository = new RentalRepository()
