export const vehiclesTable = [
    { id: 1, type: 'Carro', model: 'Fiat Uno', plate: 'ZZZ111', daily_value: 40, license_type: 'B', available: false },
    { id: 2, type: 'Carro', model: 'Volkswagen Gol', plate: 'YYY222', daily_value: 45, license_type: 'B', available: false },
    { id: 3, type: 'Moto', model: 'Harley-Davidson Sportster', plate: 'XXX333', daily_value: 70, license_type: 'A', available: true },
    { id: 4, type: 'Carro', model: 'Chevrolet Onix', plate: 'WWW444', daily_value: 55, license_type: 'B', available: false },
    { id: 5, type: 'Moto', model: 'Suzuki GSX-R750', plate: 'VVV555', daily_value: 65, license_type: 'A', available: true },
]

export const clientsTable = [
    { id: 1, name: 'Maria Silva', cpf: '11122233344', license_type: 'B' },
    { id: 2, name: 'Carlos Oliveira', cpf: '55566677788', license_type: 'B' },
    { id: 3, name: 'Fernanda Santos', cpf: '99988877766', license_type: 'A' },
    { id: 4, name: 'Ricardo Souza', cpf: '44433322211', license_type: 'B' },
    { id: 5, name: 'Felipe Santos', cpf: '77788899911', license_type: 'A' },
]

export const rentalsTable = [
    { id: 1, client_id: 1, vehicle_id: 1, daily_value: 45, start_date: new Date('2023-11-05T00:00:00'), return_date: undefined, amount: 0, status: 'Andamento' },
    { id: 2, client_id: 2, vehicle_id: 2, daily_value: 55, start_date: new Date('2023-11-08T00:00:00'), return_date: undefined, amount: 0, status: 'Andamento' },
    { id: 3, client_id: 3, vehicle_id: 3, daily_value: 50, start_date: new Date('2023-11-12T00:00:00'), return_date: new Date('2023-12-18T00:00:00'), amount: 300, status: 'Finalizado' },
    { id: 4, client_id: 4, vehicle_id: 4, daily_value: 65, start_date: new Date('2023-11-16T00:00:00'), return_date: undefined, amount: 0, status: 'Andamento' },
    { id: 5, client_id: 5, vehicle_id: 5, daily_value: 60, start_date: new Date('2023-11-20T00:00:00'), return_date: new Date('2023-12-26T00:00:00'), amount: 360, status: 'Finalizado' },
]

