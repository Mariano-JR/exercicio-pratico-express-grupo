import { Client } from "../entities/client"

export interface SaveClient {
  save: (client: SaveClient.Input) => Promise<void>
}

export namespace SaveClient {
  export type Input = Client
}

export interface ListClient {
  list: () => Promise<ListClient.Output>
}

export namespace ListClient {
  export type Output = Array<Client> | undefined
}

export interface GetByCpfClient {
  getByCpf: (input: GetByCpfClient.Input) => Promise<GetByCpfClient.Output>
}

export namespace GetByCpfClient {
  export type Input = {
    cpf: string
  }

  export type Output = Client | undefined
}
