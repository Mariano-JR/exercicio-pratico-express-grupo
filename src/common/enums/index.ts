export const LicenseTypeEnum = {
  A: 'A',
  B: 'B',
}

export const VehicleTypeEnum = {
  CAR: 'CAR',
  MOTORCYCLE: 'MOTORCYCLE'
}

export const vehicleTypeMap = (value: string): string => {
  const vehicleTypeMap: Record<string, string> = {
    [VehicleTypeEnum.CAR]: 'Carro',
    [VehicleTypeEnum.MOTORCYCLE]: 'Moto'
  }
  return vehicleTypeMap[value] || value
}

export const RentalStatusEnum = {
  PROGRESS: 'PROGRESS',
  FINISHED: 'FINISHED'
}

export const rentalStatusMap = (value: string): string => {
  const rentalStatusMap: Record<string, string> = {
    [RentalStatusEnum.PROGRESS]: 'Em Progresso',
    [RentalStatusEnum.FINISHED]: 'Finalizado'
  }
  return rentalStatusMap[value] || value
}
