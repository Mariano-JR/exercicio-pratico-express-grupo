export class Vehicle {
    public id: number = 0
    public type: string
    public model: string
    public plate: string
    public daily_value: number
    public license_type: string
    public available: boolean

    constructor(type: string, model: string, plate: string, daily_value: number) {
        this.type = type
        this.model = model
        this.plate = plate
        this.daily_value = daily_value
        this.license_type = type == 'Carro' ? 'B' : 'A'
        this.available = true
    }
}