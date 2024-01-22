import { Client } from "../../models/client";
import { clientsRepository } from "../../infra/database/repositories/client";

class RegisterClientService {
    execute(client: Client) {
        const newClient = clientsRepository.save(client)
        return newClient
    }
}

export const registerClientService = new RegisterClientService()