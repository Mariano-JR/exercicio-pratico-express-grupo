import { Router } from 'express'
import { clientsController } from '../modules/client/controllers/client'
import { vehiclesController } from '../modules/vehicle/controllers/vehicle'
import { rentalController } from '../modules/rental/controllers/rental'
import { errorHandlerMiddleware } from '../common/middlewares/error-handler'

export const routes = Router()

routes.get('/clients', clientsController.list)
routes.post('/clients', clientsController.register)

routes.get('/vehicles', vehiclesController.list)
routes.post('/vehicles', vehiclesController.register)

routes.get('/rentals', rentalController.list)
routes.post('/rentals', rentalController.register)
routes.patch('/rentals/:id', rentalController.return)

routes.use(errorHandlerMiddleware.execute);
