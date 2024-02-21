import { listClientsService } from '../services/list-clients';
import { registerClientService } from '../services/register-client';
import { createTemplate } from '../../../common/helpers/template';
import { Request, Response, NextFunction } from 'express';

export class ClientController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await listClientsService.execute()
      res.format({
        'application/json': () => {
          res.status(200).send(clients);
        },
        'text/html': () => {
          const template = createTemplate('clients.hbs');
          res.send(template(clients));
        }
      })
      next()
    } catch (err) {
      next(err)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, license_type } = req.body
      const id = await registerClientService.execute({
        name, cpf, licenseType: license_type
      })
      res.status(201).send(id)
      next()
    } catch (err) {
      next(err)
    }
  }
}

export const clientsController = new ClientController()
