import { Router } from 'express'
import { clientsController } from './controllers/client'
import { vehiclesController } from './controllers/vehicle'
import { rentsController } from './controllers/rent'

export const routes = Router()

routes.get('/clients', clientsController.listHTTP)
routes.get('/rents/:cpf', rentsController.listRentHTTP)
routes.get('/vehicles/:license_type/rented', vehiclesController.listHTTPRented)
routes.get('/vehicles/:license_type/available', vehiclesController.listHTTPAvailable)

routes.post('/rents', rentsController.registerHTTP)
routes.post('/clients', clientsController.registerHTTP)
routes.post('/vehicles', vehiclesController.registerHTTP)

routes.put('/rent/:id', rentsController.returnHTTP)