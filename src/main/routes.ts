import { Router } from 'express'
import { clientsController } from './controllers/client'
import { vehiclesController } from './controllers/vehicle'
import { rentsController } from './controllers/rent'
import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'
import { vehicleMiddleware } from './middlewares/VehicleMiddleware'
import { clientMiddleware } from './middlewares/ClientMiddleware'


export const routes = Router()

routes.get('/clients', clientsController.listHTTP)
routes.get('/rents/:cpf', rentsController.listRentHTTP)
routes.get('/vehicles/:license_type/rented', vehiclesController.listHTTPRented)
routes.get('/vehicles/:license_type/available', vehiclesController.listHTTPAvailable)

routes.post('/rents', rentsController.registerHTTP)
routes.post('/clients', clientMiddleware.validateNewClient, clientsController.registerHTTP)
routes.post('/vehicles', vehicleMiddleware.validateNewVehicle, vehiclesController.registerHTTP)

routes.put('/rent/:id', rentsController.returnHTTP)

routes.use(errorHandlerMiddleware.execute);