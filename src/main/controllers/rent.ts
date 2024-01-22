import * as readlineSync from 'readline-sync'
import { Rent } from "../../models/rent";
import { ClientRepositoryInterface } from "../../infra/database/interfaces/client";
import { VehicleRepositoryInterface } from "../../infra/database/interfaces/vehicle";
import { RentRepositoryInterface } from "../../infra/database/interfaces/rent";
import { formatCurrency } from '../helpers/currency';
import { formatDate, formatDateToSave } from '../helpers/date';

export class RentController {
    constructor(
        private clientRepository: ClientRepositoryInterface,
        private vehicleRepository: VehicleRepositoryInterface,
        private rentRepository: RentRepositoryInterface,
    ) { }

    public generateInvoice(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const client = this.clientRepository.findByCpf(cpf)
        if (!client) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        const rentals = this.rentRepository.findByClientId(client.id)
        if (!rentals) {
            console.log('\nErro: O cliente nao possui alugueis')
            return false
        }
        console.log('\n --------------------------------------------------------------------------------------------------------------\n|                                          Lista alugueis do cliente                                           |\n --------------------------------------------------------------------------------------------------------------\n')
        rentals.map(rent => {
            const vehicle = this.vehicleRepository.findById(rent.vehicle_id)
            console.log(`- ID: ${rent.id} | Cliente: ${client.name} | Veiculo: ${vehicle!.model} | Data de Locacao: ${formatDate(rent.start_date)}\n`)
        })
        const rent_id = +readlineSync.question('\nDigite o id do aluguel: ')
        const rentExists = this.rentRepository.findById(rent_id)
        if (!rentExists) {
            console.log('\nErro: Aluguel nao encontrado')
            return false
        }
        const vehicle = this.vehicleRepository.findById(rentExists.vehicle_id)
        console.log(`\n --------------------------------------------------------------------------------------------------------------\n|                                                  Fatura #${rentExists.id}                                                   |\n --------------------------------------------------------------------------------------------------------------\n`)
        console.log(`ID: ${rentExists.id}\nCliente: ${client.name}\nVeiculo: ${vehicle!.model}\nData de Locacao: ${formatDate(rentExists.start_date)}\n${rentExists.return_date !== undefined ? `Data de Entrega: ${formatDate(rentExists.return_date!)}\nValor total: ${formatCurrency(rentExists.amount)}` : 'Status: Andamento'}\n`)
    }

    public register(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const clientExists = this.clientRepository.findByCpf(cpf)
        if (!clientExists) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        let rentExists = this.rentRepository.findByClientIdAndStatus(clientExists.id, 'Andamento')
        if (rentExists) {
            console.log('\nErro: Esse cliente ja possui um aluguel em andamento!')
            return false
        }
        const license_type = readlineSync.question('\nDigite o tipo de licenca do cliente: (A/B) ')
        const vehiclesExists = this.vehicleRepository.findByLicenseAndAvailable(license_type, true)
        if (!vehiclesExists) {
            console.log('\nErro: Licenca invalida, ou nao ha veiculos dessa licenca para alugar')
            return false
        }
        console.log(`\n --------------------------------------------------------------------------------------------------------------\n|                                        Lista de veiculos disponiveis                                         |\n --------------------------------------------------------------------------------------------------------------\n`)
        vehiclesExists.map(vehicle => {
            console.log(`- ID: ${vehicle.id} | Veiculo: ${vehicle.type} | Modelo: ${vehicle.model} | Placa: ${vehicle.plate} | Valor da Diaria: R$ ${vehicle.daily_value},00\n`)
        })
        const vehicle_id = +readlineSync.question('\nDigite o Id do veiculo: ')
        const vehicle = this.vehicleRepository.findById(vehicle_id)
        if (!vehicle) {
            console.log('\nErro: Veiculo nao encontrado')
            return false
        }
        const daily_value = vehicle.daily_value
        const start_date = readlineSync.question('\nDigite a data de inicio do aluguel: ')

        const rent = new Rent(clientExists.id, vehicle_id, daily_value, formatDateToSave(start_date))
        this.rentRepository.save(rent)
        console.log('\nVeiculo alugado com sucesso!')
    }

    public return(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const client = this.clientRepository.findByCpf(cpf)
        if (!client) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        const plate = readlineSync.question('\nDigite a placa do veiculo: ')
        const vehicle = this.vehicleRepository.findByPlate(plate)
        if (!vehicle) {
            console.log('\nErro: Veiculo nao encontrado')
            return false
        }
        let rentExists = this.rentRepository.findByClientIdAndStatus(client.id, 'Andamento')
        if (!rentExists) {
            console.log('\nErro: Esse cliente nao possui nenhum um aluguel em andamento!')
            return false
        }

        rentExists = Rent.return(rentExists, vehicle.type)
        this.rentRepository.updateReturn(rentExists)
        console.log('\nVeiculo devolvido com sucesso!')
    }
}
