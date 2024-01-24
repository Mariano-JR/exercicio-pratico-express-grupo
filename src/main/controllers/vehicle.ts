import * as readlineSync from 'readline-sync'
import { Request, Response, NextFunction } from 'express'

import { Vehicle } from "../../models/vehicle";
import { formatCurrency } from '../helpers/currency';
import { vehiclesRepository } from '../../infra/database/repositories/vehicle'
import { registerVehicleService } from '../services/RegisterVehicleService';
import { listVehiclesService } from '../services/ListVehiclesService';

class VehicleController {

    listHTTPAvailable(req: Request , res: Response , next: NextFunction) {
        try {
            const { license_type } = req.params
            const vehicles = listVehiclesService.execute(license_type, true)

            res.send(vehicles)
            next()
        } catch(err) {
            next(err)
        }
    }

    listHTTPRented(req: Request , res: Response , next: NextFunction) {
        try {
            const { license_type } = req.params
            const vehicles = listVehiclesService.execute(license_type, false)

            res.send(vehicles)
            next()
        } catch(err) {
            next(err)
        }
    }

    list(filter: boolean): void {
        const vehicles = vehiclesRepository.listByFilter(filter)
        console.log(`\n --------------------------------------------------------------------------------------------------------------\n|                                        Lista de veiculos ${filter ? 'disponiveis' : ' alugados  '}                                         |\n --------------------------------------------------------------------------------------------------------------\n`)
        vehicles.map(vehicle => {
            console.log(`- ID: ${vehicle.id} | Tipo: ${vehicle.type} | Modelo: ${vehicle.model} | Placa: ${vehicle.plate} | Valor da Diária: ${formatCurrency(vehicle.daily_value)} \n`)
        })
    }

    registerHTTP(req: Request , res: Response , next: NextFunction) {
        try {
            const vehicle = registerVehicleService.execute(req.body)
            res.status(201).send(vehicle)
            next()
        } catch(err) {
            next(err)
        }
    }

    register(): void | boolean {
        const type = readlineSync.question('\nDigite a tipo de veiculo: (Carro/Moto) ')
        const model = readlineSync.question('\nDigite o modelo do veiculo: ')
        const plate = readlineSync.question('\nDigite a placa do veiculo: ')
        const vehicleExists = vehiclesRepository.findByPlate(plate)
        if (vehicleExists) {
            console.log('\nErro: Veiculo já cadastrado no sistema')
            return false
        }
        const daily_value = +readlineSync.question('\nDigite o valor da diaria do aluguel: ')

        const vehicle = new Vehicle(type, model, plate, daily_value)
        vehiclesRepository.save(vehicle)
        console.log('\nVeiculo cadastrado')
    }
}

export const vehiclesController = new VehicleController()