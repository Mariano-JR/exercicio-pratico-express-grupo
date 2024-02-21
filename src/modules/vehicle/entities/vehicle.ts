import { LicenseTypeEnum, VehicleTypeEnum } from "../../../common/enums";
import { uuidGenerate } from "../../../common/helpers/uuid";

export class Vehicle {
  constructor(
    public id: string,
    public type: string,
    public model: string,
    public plate: string,
    public dailyValue: number,
    public licenseType: string,
    public available: boolean
  ) { }

  static create({ type, model, plate, dailyValue }: CreateInput): Vehicle {
    const id = uuidGenerate();
    const licenseType = type == VehicleTypeEnum.CAR ? LicenseTypeEnum.B : LicenseTypeEnum.A;
    const available = true;
    return new Vehicle(id, type, model, plate, dailyValue, licenseType, available);
  }
}

type CreateInput = {
  type: string
  model: string
  plate: string
  dailyValue: number
}
