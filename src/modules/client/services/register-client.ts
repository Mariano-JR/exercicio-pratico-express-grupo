import { Client } from "../entities/client";
import { clientsRepository } from "../repositories/client";
import { AppError } from "../../../common/errors/app-error";

class RegisterClientService {
  async execute({ name, cpf, licenseType }: Input) {
    const clientExists = await clientsRepository.getByCpf({ cpf });
    if (clientExists) throw new AppError("CPF já cadastrado");
    const newClient = Client.create({ name, cpf, licenseType });
    await clientsRepository.save(newClient);
    return newClient.id;
  }
}

type Input = {
  name: string
  cpf: string
  licenseType: string
}

export const registerClientService = new RegisterClientService()


