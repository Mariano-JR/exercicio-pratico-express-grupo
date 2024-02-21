import { PrismaClient } from '@prisma/client'
import { LicenseTypeEnum, RentalStatusEnum, VehicleTypeEnum } from '../src/common/enums';

const prisma = new PrismaClient();

async function main() {
  await prisma.client.create({
    data: {
      id: '52e52322-244f-4050-90f7-92e242419cb1',
      cpf: '12345678901',
      name: 'João da Silva',
      license_type: LicenseTypeEnum.A,
    },
  })

  await prisma.vehicle.create({
    data: {
      id: '028baac4-46ae-11ee-be56-0242ac120002',
      plate: 'ABC1234',
      type: VehicleTypeEnum.CAR,
      model: 'Ford Ka',
      daily_value: 100.00,
      license_type: LicenseTypeEnum.B,
      available: false,
    },
  })

  await prisma.rental.create({
    data: {
      id: '09fb0336-46ae-11ee-be56-0242ac120002',
      start_date: new Date(),
      daily_value: 100.00,
      amount: 0,
      client_id: '52e52322-244f-4050-90f7-92e242419cb1',
      vehicle_id: '028baac4-46ae-11ee-be56-0242ac120002',
      status: RentalStatusEnum.PROGRESS,
    },
  })
}

main()
  .then(async () => {
    console.log('Seed created')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(`Error created seed: ${e}`)
    await prisma.$disconnect()
    process.exit(1)
  })
