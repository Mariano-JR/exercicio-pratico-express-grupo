import { Router } from 'express'
import { clientsController } from './controllers/client'
import { vehiclesController } from './controllers/vehicle'

export const routes = Router()

routes.get('/rents')
routes.get('/clients', clientsController.listHTTP)
routes.get('/vehicles/:license_type/rented', vehiclesController.listHTTPRented)
routes.get('/vehicles/:license_type/available', vehiclesController.listHTTPAvailable)

routes.post('/rents')
routes.post('/clients', clientsController.registerHTTP)
routes.post('/vehicles', vehiclesController.registerHTTP)

routes.put('rents')