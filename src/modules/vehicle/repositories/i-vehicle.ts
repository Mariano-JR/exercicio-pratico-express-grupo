import { Vehicle } from "../entities/vehicle"

export interface SaveVehicle {
  save: (vehicle: SaveVehicle.Input) => Promise<void>
}

export namespace SaveVehicle {
  export type Input = Vehicle
}

export interface ListVehicle {
  list: (input: ListVehicle.Input) => Promise<ListVehicle.Output>
}

export namespace ListVehicle {
  export type Input = {
    licenseType?: string | null
    available?: boolean | null
  }

  export type Output = Array<Vehicle> | undefined
}

export interface GetByIdVehicle {
  getById: (input: GetByIdVehicle.Input) => Promise<GetByIdVehicle.Output>
}

export namespace GetByIdVehicle {
  export type Input = {
    id: string
  }

  export type Output = Vehicle | undefined
}

export interface GetByPlateVehicle {
  getByPlate: (input: GetByPlateVehicle.Input) => Promise<GetByPlateVehicle.Output>
}

export namespace GetByPlateVehicle {
  export type Input = {
    plate: string
  }

  export type Output = Vehicle | undefined
}
