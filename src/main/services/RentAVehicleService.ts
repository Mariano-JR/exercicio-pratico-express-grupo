import { Rent } from "../../models/rent"
import { AppError } from "../errors/AppError"
import { rentsRepository } from "../../infra/database/repositories/rent"
import { clientsRepository } from "../../infra/database/repositories/client"
import { vehiclesRepository } from "../../infra/database/repositories/vehicle"

class RentAVehicleService {
    execute(clientCPF: string, vehiclePlate: string) {
        const client = clientsRepository.findByCpf(clientCPF)
        const vehicle = vehiclesRepository.findByPlate(vehiclePlate)

        if(!client) throw new AppError("Cliente não encontrado", 404)
        if(!vehicle) throw new AppError("Veiculo não encontrado", 404)

        let rent = rentsRepository.findByClientIdAndStatus(client.id, "Andamento")
        if (rent) throw new AppError("Este cliente já tem um aluguel em andamento!", 404)
        
        rent = rentsRepository.findByVehicleIdAndStatus(vehicle.id, "Andamento")
        if (rent) throw new AppError("Este veículo já está alugado!", 404)

        const newRent = new Rent(client.id, vehicle.id, vehicle.daily_value, new Date())
        return rentsRepository.save(newRent)
    }
}

export const rentAVehicleService = new RentAVehicleService()