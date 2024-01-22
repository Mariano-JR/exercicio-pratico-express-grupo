import { rentalsTable, vehiclesTable } from "../tables"
import { Rent } from "../../../models/rent"
import { RentRepositoryInterface } from "../interfaces/rent"

class RentRepository implements RentRepositoryInterface {
    findById(id: number): Rent | undefined {
        const rent = rentalsTable.find((rent) => rent.id == id)
        return rent
    }

    findByClientId(client_id: number): Rent[] | undefined {
        const rentals = rentalsTable.filter((rent) => rent.client_id == client_id)
        if (rentals.length > 0) return rentals
    }

    findByClientIdAndStatus(client_id: number, status: string): Rent | undefined {
        const rent = rentalsTable.find((rent) => rent.client_id == client_id && rent.status == status)
        return rent
    }

    save(rent: Rent): Rent {
        rent.id = rentalsTable.length > 0 ? rentalsTable[rentalsTable.length - 1].id + 1 : 1
        rentalsTable.push(rent)
        const vehicle = vehiclesTable.find((vehicle) => vehicle.id == rent.vehicle_id)
        vehicle!.available = false
        return rent
    }

    updateReturn(updateRent: Rent): Rent {
        const rent = rentalsTable.find((rent) => rent.id == updateRent.id)
        rent!.return_date = updateRent.return_date
        rent!.amount = updateRent.amount
        rent!.status = updateRent.status
        const vehicle = vehiclesTable.find((vehicle) => vehicle.id == rent!.vehicle_id)
        vehicle!.available = true
        return rent!
    }
}

export const rentsRepository = new RentRepository()
