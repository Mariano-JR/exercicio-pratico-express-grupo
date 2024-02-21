import { ListClient, SaveClient, GetByCpfClient } from "./i-client"
import prisma from '../../../common/helpers/prisma-connection'

export class ClientRepository implements SaveClient, ListClient, GetByCpfClient {
  async save({ id, name, cpf, licenseType }: SaveClient.Input): Promise<void> {
    await prisma.client.create({
      data: { id, name, cpf, license_type: licenseType }
    })
  }

  async list(): Promise<ListClient.Output> {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        license_type: true,
      }
    })
    if (clients !== null && clients !== undefined) {
      return clients.map((client) => ({
        id: client.id,
        name: client.name,
        cpf: client.cpf,
        licenseType: client.license_type,
      }))
    }
  }

  async getByCpf({ cpf }: GetByCpfClient.Input): Promise<GetByCpfClient.Output> {
    const client = await prisma.client.findUnique({
      where: {
        cpf
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        license_type: true,
      }
    })
    if (client !== null && client !== undefined) {
      return {
        id: client.id,
        name: client.name,
        cpf: client.cpf,
        licenseType: client.license_type,
      }
    }
  }
}

export const clientsRepository = new ClientRepository()
