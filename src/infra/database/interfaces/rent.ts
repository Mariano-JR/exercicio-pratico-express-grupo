import { Rent } from "../../../models/rent"

export interface RentRepositoryInterface {
    findById(id: number): Rent | undefined
    findByClientId(client_id: number): Rent[] | undefined
    findByClientIdAndStatus(client_id: number, status: string): Rent | undefined
    save(rent: Rent): Rent
    updateReturn(rent: Rent): Rent
}