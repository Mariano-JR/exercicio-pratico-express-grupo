import * as readlineSync from 'readline-sync'

import { RentController } from "./controllers/rent"
import { clientsController } from "./controllers/client"
import { vehiclesController } from "./controllers/vehicle"
import { rentsRepository } from "../infra/database/repositories/rent"
import { clientsRepository } from "../infra/database/repositories/client"
import { vehiclesRepository } from "../infra/database/repositories/vehicle"

const rentController = new RentController(
    clientsRepository,
    vehiclesRepository,
    rentsRepository
)

function main(): void {
    let welcome = true
    let message
    let option

    do {
        if (welcome) {
            welcome = false
            message = '\n --------------------------------------------------------------------------------------------------------------\n|                                      Bem Vindo ao sistema da Unidos SME                                      |\n --------------------------------------------------------------------------------------------------------------\n\nPara prosseguir, escolha uma das opcoes abaixo:\n'
        } else {
            message = '\nEscola outra opcao para continuar:\n'
        }

        option = +readlineSync.question(
            message + '\n1 - Cadastrar Cliente\n2 - Listar Clientes\n3 - Cadastrar Veiculo\n4 - Alugar Veiculo\n5 - Devolver Veiculo\n6 - Listar Veiculos Disponiveis\n7 - Listar Veiculos Alugados\n8 - Mostrar Fatura do Cliente\n0 - Sair do sistema\n\n'
        )

        switch (option) {
            case 1:
                clientsController.register()
                break
            case 2:
                clientsController.list()
                break
            case 3:
                vehiclesController.register()
                break
            case 4:
                rentController.register()
                break
            case 5:
                rentController.return()
                break
            case 6:
                vehiclesController.list(true)
                break
            case 7:
                vehiclesController.list(false)
                break
            case 8:
                rentController.generateInvoice()
                break
            case 0:
                console.log('\nSaindo do sistema\n')
                break
            default:
                console.log('\nOpcao invalida\n')
        }
    } while (option != 0)
}
main()