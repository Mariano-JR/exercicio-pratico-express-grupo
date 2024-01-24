import { Client } from "../../models/client";
import { clientsRepository } from "../../infra/database/repositories/client";
import { AppError } from "../errors/AppError";

class RegisterClientService {
    execute(client: Client) {
        const clientExist = clientsRepository.list().find(values => values.cpf === client.cpf)
        if(clientExist) throw new AppError("CPF já cadastrado")
        
        const newClient = clientsRepository.save(client)
        return newClient
    }
}

export const registerClientService = new RegisterClientService()