import { differenceInHours } from "../../../common/helpers/date"
import { RentalStatusEnum, VehicleTypeEnum } from "../../../common/enums";
import { uuidGenerate } from "../../../common/helpers/uuid";

export class Rental {
  constructor(
    public id: string,
    public clientId: string,
    public vehicleId: string,
    public dailyValue: number,
    public startDate: Date,
    public returnDate: Date | null,
    public amount: number,
    public status: string,
  ) { }

  static create({ clientId, vehicleId, dailyValue }: CreateInput): Rental {
    const id = uuidGenerate();
    const startDate = new Date();
    const status = RentalStatusEnum.PROGRESS
    return new Rental(id, clientId, vehicleId, dailyValue, startDate, null, 0, status);
  }

  static return(rental: Rental, vehicleType: string): Rental {
    rental.returnDate = new Date()
    rental.amount = this.calculateAmount(rental, vehicleType)
    rental.status = RentalStatusEnum.FINISHED
    return rental
  }

  private static calculateAmount(rental: Rental, vehicleType: string): number {
    let amount
    const addition = vehicleType == VehicleTypeEnum.CAR ? 0.10 : 0.05
    const rentedHours = differenceInHours(rental.startDate, rental.returnDate!)
    if (rentedHours < 24) {
      amount = rental.dailyValue
    } else {
      const hour_value = rental.dailyValue / 24
      amount = rentedHours * hour_value
    }
    return amount * (1 + addition)
  }
}

type CreateInput = {
  clientId: string
  vehicleId: string
  dailyValue: number
}
