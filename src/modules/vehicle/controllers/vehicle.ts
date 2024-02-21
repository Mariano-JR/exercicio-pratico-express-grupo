import { registerVehicleService } from '../services/register-vehicle';
import { listVehiclesService } from '../services/list-vehicles';
import { createTemplate } from '../../../common/helpers/template';
import { Request, Response, NextFunction } from 'express'

class VehicleController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { license_type, available } = req.query
      const vehicles = await listVehiclesService.execute({
        licenseType: license_type as string | null,
        available: available as string | null
      })
      res.format({
        'application/json': () => {
          res.status(200).send(vehicles);
        },
        'text/html': () => {
          const template = createTemplate('vehicles.hbs');
          res.send(template(vehicles));
        }
      })
      next()
    } catch (err) {
      next(err)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, model, plate, daily_value } = req.body
      const id = await registerVehicleService.execute({
        type, model, plate, dailyValue: daily_value
      })
      res.status(201).send(id)
      next()
    } catch (err) {
      next(err)
    }
  }
}

export const vehiclesController = new VehicleController()
