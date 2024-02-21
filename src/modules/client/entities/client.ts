import { uuidGenerate } from "../../../common/helpers/uuid";

export class Client {
  constructor(
    public id: string,
    public name: string,
    public cpf: string,
    public licenseType: string
  ) { }

  static create({ name, cpf, licenseType }: CreateInput): Client {
    const id = uuidGenerate();
    return new Client(id, name, cpf, licenseType)
  }
}

type CreateInput = {
  name: string
  cpf: string
  licenseType: string
}
