import * as readlineSync from 'readline-sync'
import { Request, Response, NextFunction } from 'express';

import { Client } from "../../models/client";
import { listClientsService } from '../services/ListClientsService';
import { clientsRepository } from '../../infra/database/repositories/client';
import { registerClientService } from '../services/RegisterClientService';

export class ClientController {
    listHTTP(req: Request , res: Response , next: NextFunction) {
        const clients = listClientsService.execute()
        res.send(clients)
        next()
    }

    list(): void | boolean {
        const clients = clientsRepository.list()
        console.log(`\n --------------------------------------------------------------------------------------------------------------\n|                                              Lista de Clientes                                               |\n --------------------------------------------------------------------------------------------------------------\n`)
        clients.map(client => {
            console.log(`- ID: ${client.id} | Nome: ${client.name} | CPF: ${client.cpf} | Licenca: ${client.license_type}\n`)
        })
    }

    registerHTTP(req: Request , res: Response , next: NextFunction) {
        try {
            const client = registerClientService.execute(req.body)
            res.status(201).send(client)
            next()
        } catch(err) {
            next(err)
        }
    }

    register(): void | boolean {
        const name = readlineSync.question('\nDigite o nome do cliente: ')
        const cpf = readlineSync.question('\nDigite o cpf do cliente, apenas numeros: ')
        const clientExists = clientsRepository.findByCpf(cpf)
        if (clientExists) {
            console.log('\nErro: Cliente já cadastrado no sistema')
            return false
        }
        const license_type = readlineSync.question('\nDigite o tipo de carteira do cliente: (A/B) ')

        const client = new Client(name, cpf, license_type)
        clientsRepository.save(client)
        console.log('\nCliente cadastrado com sucesso!')
    }
}

export const clientsController = new ClientController()