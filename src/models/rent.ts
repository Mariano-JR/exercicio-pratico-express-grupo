import { differenceInHours } from "../main/helpers/date"

export class Rent {
    id: number = 0
    client_id: number
    vehicle_id: number
    daily_value: number
    start_date: Date
    return_date?: Date
    amount: number = 0
    status: string

    constructor(client_id: number, vehicle_id: number, daily_value: number, start_date: Date) {
        this.client_id = client_id
        this.vehicle_id = vehicle_id
        this.daily_value = daily_value
        this.start_date = start_date
        this.status = 'Andamento'
    }

    static return(rent: Rent, vehicle_type: string): Rent {
        rent.return_date = new Date()
        rent.amount = this.calculateAmount(rent, vehicle_type)
        rent.status = 'Finalizado'
        return rent
    }

    private static calculateAmount(rent: Rent, vehicle_type: string): number {
        let amount
        const addition = vehicle_type == 'Carro' ? 0.10 : 0.05
        const rentedHours = differenceInHours(rent.start_date, rent.return_date!)
        if (rentedHours < 24) {
            amount = rent.daily_value
        } else {
            const hour_value = rent.daily_value / 24
            amount = rentedHours * hour_value
        }
        return amount * (1 + addition)
    }
}