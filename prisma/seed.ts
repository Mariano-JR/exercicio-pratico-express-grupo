import { PrismaClient } from '@prisma/client'
import { LicenseTypeEnum, RentalStatusEnum, VehicleTypeEnum } from '../src/common/enums';

const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: [
      {
        id: '52e52322-244f-4050-90f7-92e242419cb1',
        cpf: '12345678901',
        name: 'João da Silva',
        license_type: LicenseTypeEnum.A,
      },
      {
        id: '52e52322-244f-4050-90f7-92e242419cb2',
        cpf: '12345678902',
        name: 'Maria da Silva',
        license_type: LicenseTypeEnum.B,
      }
    ],
  })

  await prisma.vehicle.createMany({
    data: [
      {
        id: '028baac4-46ae-11ee-be56-0242ac120001',
        plate: 'DEF5678',
        type: VehicleTypeEnum.MOTORCYCLE,
        model: 'CB500',
        daily_value: 80.00,
        license_type: LicenseTypeEnum.A,
        available: false,
      },
      {
        id: '028baac4-46ae-11ee-be56-0242ac120002',
        plate: 'ABC1234',
        type: VehicleTypeEnum.CAR,
        model: 'Ka 1.5',
        daily_value: 120.00,
        license_type: LicenseTypeEnum.B,
        available: false,
      },
      {
        id: '028baac4-46ae-11ee-be56-0242ac120003',
        plate: 'EKC7567',
        type: VehicleTypeEnum.MOTORCYCLE,
        model: 'Fan 125',
        daily_value: 30.00,
        license_type: LicenseTypeEnum.B,
        available: true,
      }
    ],
  })

  await prisma.rental.createMany({
    data: [
      {
        id: 'bdd24359-63a8-44ce-ad23-8e50bbff9f61',
        start_date: new Date(),
        daily_value: 50.00,
        amount: 0,
        client_id: '52e52322-244f-4050-90f7-92e242419cb1',
        vehicle_id: '028baac4-46ae-11ee-be56-0242ac120001',
        status: RentalStatusEnum.PROGRESS,
      },
      {
        id: 'bdd24359-63a8-44ce-ad23-8e50bbff9f62',
        start_date: new Date(),
        daily_value: 100.00,
        amount: 0,
        client_id: '52e52322-244f-4050-90f7-92e242419cb2',
        vehicle_id: '028baac4-46ae-11ee-be56-0242ac120002',
        status: RentalStatusEnum.PROGRESS,
      }
    ],
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
