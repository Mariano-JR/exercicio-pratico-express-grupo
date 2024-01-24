import { NextFunction, Request, Response } from "express";
import { CPF_FORMAT_INVALID, CPF_REQUIRED, LICENSE_TYPES, LICENSE_TYPE_INVALID, LICENSE_TYPE_REQUIRED, MIN_NAME_LENGTH, MIN_VALUE_REQUIRED, NAME_REQUIRED, PLATE_REQUIRED, VALUE_REQUIRED } from "../helpers/constants";
import { AppError } from "../errors/AppError";

class ClientMiddleware {
  public validateNewClient = [this.checkName, this.checkCPF, this.checkLicenseType];
  
  private checkName(req: Request, _res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name || name === '') {
      next(new AppError(NAME_REQUIRED))
      return;
    }

    if (name.length < 3) {
      next(new AppError(MIN_NAME_LENGTH))
      return;
    }

    next();
  }

  private checkCPF(req: Request, _res: Response, next: NextFunction) {
    const { cpf } = req.body;

    const regex = /^\d{11}$/;

    if (!cpf || cpf === '') {
      next(new AppError(CPF_REQUIRED))
      return;
    }

    if (!regex.test(cpf)) {
      next(new AppError(CPF_FORMAT_INVALID))
      return;
    }

    next();
  }

  private checkLicenseType(req: Request, _res: Response, next: NextFunction) {
    const { license_type } = req.body;

    if (!license_type || license_type === '') {
      next(new AppError(LICENSE_TYPE_REQUIRED))
      return;
    }

    if (!LICENSE_TYPES.includes(license_type)) {
      next(new AppError(LICENSE_TYPE_INVALID))
      return;
    }

    next();
  }

}

const clientMiddleware = new ClientMiddleware();

export { clientMiddleware };