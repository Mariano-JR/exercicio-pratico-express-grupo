import { Rental } from "../entities/rental"

export interface SaveRent {
  save: (rental: SaveRent.Input) => Promise<void>
}

export namespace SaveRent {
  export type Input = Rental
}

export interface ReturnVehicleRent {
  returnVehicle: (input: ReturnVehicleRent.Input) => Promise<void>
}

export namespace ReturnVehicleRent {
  export type Input = {
    id: string
    returnDate: Date
    amount: number
    status: string
    vehicleId: string
  }
}

export interface GetByIdRent {
  getById: (input: GetByIdRent.Input) => Promise<GetByIdRent.Output>
}

export namespace GetByIdRent {
  export type Input = {
    id: string
  }

  export type Output = Rental | undefined
}

export interface GetByClientIdRent {
  getByClientId: (input: GetByClientIdRent.Input) => Promise<GetByClientIdRent.Output>
}

export namespace GetByClientIdRent {
  export type Input = {
    clientId: string
  }

  export type Output = Array<Rental> | undefined
}

export interface GetByVehicleIdAndStatusRent {
  getByVehicleIdAndStatus: (input: GetByVehicleIdAndStatusRent.Input) => Promise<GetByVehicleIdAndStatusRent.Output>
}

export namespace GetByVehicleIdAndStatusRent {
  export type Input = {
    vehicleId: string
    status: string
  }

  export type Output = Rental | undefined
}

export interface GetByClientIdAndStatusRent {
  getByClientIdAndStatus: (input: GetByClientIdAndStatusRent.Input) => Promise<GetByClientIdAndStatusRent.Output>
}

export namespace GetByClientIdAndStatusRent {
  export type Input = {
    clientId: string
    status: string
  }

  export type Output = Rental | undefined
}
