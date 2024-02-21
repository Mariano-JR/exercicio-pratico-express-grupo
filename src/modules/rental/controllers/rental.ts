import { Request, Response, NextFunction } from 'express'

import { rentalVehicleService } from '../services/rental-vehicle';
import { returnVehicleService } from '../../vehicle/services/return-vehicle';
import { listRentalService } from '../services/list-rental';

class RentalController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.query
      const rentals = await listRentalService.execute({ cpf: cpf as string })
      res.status(200).send(rentals)
      next()
    } catch (err) {
      next(err)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf, plate } = req.body
      const rental = await rentalVehicleService.execute({ cpf, plate })
      res.status(201).send(rental)
      next()
    } catch (err) {
      next(err)
    }
  }

  async return(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await returnVehicleService.execute({ id })
      res.sendStatus(204)
      next()
    } catch (err) {
      next(err)
    }
  }
}

export const rentalController = new RentalController()
