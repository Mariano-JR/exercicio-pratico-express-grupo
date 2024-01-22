import * as readlineSync from 'readline-sync'
import { Request, Response, NextFunction } from 'express'

import { Rent } from "../../models/rent";
import { formatCurrency } from '../helpers/currency';
import { formatDate, formatDateToSave } from '../helpers/date';
import { rentAVehicleService } from '../services/RentAVehicleService';
import { rentsRepository } from '../../infra/database/repositories/rent';
import { clientsRepository } from '../../infra/database/repositories/client';
import { vehiclesRepository } from '../../infra/database/repositories/vehicle';
import { returnAVehicleService } from '../services/ReturnAVehicleService';
import { listRentService } from '../services/ListRentService';

class RentController {
    listRentHTTP(req: Request , res: Response , next: NextFunction) {
        try {
            const { cpf } = req.params
            const rents = listRentService.execute(cpf)
            res.status(200).send(rents)
            next()
        } catch(err) {
            next(err)
        }
    }

    generateInvoice(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const client = clientsRepository.findByCpf(cpf)
        if (!client) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        const rentals = rentsRepository.findByClientId(client.id)
        if (!rentals) {
            console.log('\nErro: O cliente nao possui alugueis')
            return false
        }
        console.log('\n --------------------------------------------------------------------------------------------------------------\n|                                          Lista alugueis do cliente                                           |\n --------------------------------------------------------------------------------------------------------------\n')
        rentals.map(rent => {
            const vehicle = vehiclesRepository.findById(rent.vehicle_id)
            console.log(`- ID: ${rent.id} | Cliente: ${client.name} | Veiculo: ${vehicle!.model} | Data de Locacao: ${formatDate(rent.start_date)}\n`)
        })
        const rent_id = +readlineSync.question('\nDigite o id do aluguel: ')
        const rentExists = rentsRepository.findById(rent_id)
        if (!rentExists) {
            console.log('\nErro: Aluguel nao encontrado')
            return false
        }
        const vehicle = vehiclesRepository.findById(rentExists.vehicle_id)
        console.log(`\n --------------------------------------------------------------------------------------------------------------\n|                                                  Fatura #${rentExists.id}                                                   |\n --------------------------------------------------------------------------------------------------------------\n`)
        console.log(`ID: ${rentExists.id}\nCliente: ${client.name}\nVeiculo: ${vehicle!.model}\nData de Locacao: ${formatDate(rentExists.start_date)}\n${rentExists.return_date !== undefined ? `Data de Entrega: ${formatDate(rentExists.return_date!)}\nValor total: ${formatCurrency(rentExists.amount)}` : 'Status: Andamento'}\n`)
    }

    registerHTTP(req: Request , res: Response , next: NextFunction) {
        try {
            const { client_cpf, vehicle_plate } = req.body
            const rent = rentAVehicleService.execute(client_cpf, vehicle_plate)
            res.status(201).send(rent)
            next()
        } catch(err) {
            next(err)
        }
    }

    register(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const clientExists = clientsRepository.findByCpf(cpf)
        if (!clientExists) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        let rentExists = rentsRepository.findByClientIdAndStatus(clientExists.id, 'Andamento')
        if (rentExists) {
            console.log('\nErro: Esse cliente ja possui um aluguel em andamento!')
            return false
        }
        const license_type = readlineSync.question('\nDigite o tipo de licenca do cliente: (A/B) ')
        const vehiclesExists = vehiclesRepository.findByLicenseAndAvailable(license_type, true)
        if (!vehiclesExists) {
            console.log('\nErro: Licenca invalida, ou nao ha veiculos dessa licenca para alugar')
            return false
        }
        console.log(`\n --------------------------------------------------------------------------------------------------------------\n|                                        Lista de veiculos disponiveis                                         |\n --------------------------------------------------------------------------------------------------------------\n`)
        vehiclesExists.map(vehicle => {
            console.log(`- ID: ${vehicle.id} | Veiculo: ${vehicle.type} | Modelo: ${vehicle.model} | Placa: ${vehicle.plate} | Valor da Diaria: R$ ${vehicle.daily_value},00\n`)
        })
        const vehicle_id = +readlineSync.question('\nDigite o Id do veiculo: ')
        const vehicle = vehiclesRepository.findById(vehicle_id)
        if (!vehicle) {
            console.log('\nErro: Veiculo nao encontrado')
            return false
        }
        const daily_value = vehicle.daily_value
        const start_date = readlineSync.question('\nDigite a data de inicio do aluguel: ')

        const rent = new Rent(clientExists.id, vehicle_id, daily_value, formatDateToSave(start_date))
        rentsRepository.save(rent)
        console.log('\nVeiculo alugado com sucesso!')
    }

    returnHTTP(req: Request , res: Response , next: NextFunction) {
        try {
            const { id } = req.params
            const returnVehicle = returnAVehicleService.execute(Number(id))
            res.send(returnVehicle)
            next()
        } catch(err) {
            next(err)
        }
    }

    return(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const client = clientsRepository.findByCpf(cpf)
        if (!client) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        const plate = readlineSync.question('\nDigite a placa do veiculo: ')
        const vehicle = vehiclesRepository.findByPlate(plate)
        if (!vehicle) {
            console.log('\nErro: Veiculo nao encontrado')
            return false
        }
        let rentExists = rentsRepository.findByClientIdAndStatus(client.id, 'Andamento')
        if (!rentExists) {
            console.log('\nErro: Esse cliente nao possui nenhum um aluguel em andamento!')
            return false
        }

        rentExists = Rent.return(rentExists, vehicle.type)
        rentsRepository.updateReturn(rentExists)
        console.log('\nVeiculo devolvido com sucesso!')
    }
}

export const rentsController = new RentController()