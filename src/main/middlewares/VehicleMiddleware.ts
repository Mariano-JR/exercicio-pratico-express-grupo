import { NextFunction, Request, Response } from "express";
import { CAR_TYPES, MIN_VALUE_REQUIRED, MODEL_REQUIRED, PLATE_FORMAT_INVALID, PLATE_REQUIRED, TYPE_INVALID, TYPE_REQUIRED, VALUE_REQUIRED } from "../helpers/constants";
import { AppError } from "../errors/AppError";

class VehicleMiddleware {
  public validateNewVehicle = [
    this.checkType,
    this.checkModel,
    this.checkPlate,
    this.checkDailyValue
  ];
  
  private checkType(req: Request, _res: Response, next: NextFunction) {
    const { type } = req.body;

    if (!type || type === '') {
      next(new AppError(TYPE_REQUIRED))
      return;
    }

    if (!CAR_TYPES.includes(type)) {
      next(new AppError(TYPE_INVALID))
      return;
    }

    next();
  }

  private checkModel(req: Request, _res: Response, next: NextFunction) {
    const { model } = req.body;

    if (!model || model === '') {
      next(new AppError(MODEL_REQUIRED))
      return;
    }

    next();
  }

  private checkPlate(req: Request, _res: Response, next: NextFunction) {
    const { plate } = req.body;

    const regex = /^[A-Z]{3}\d{3}$/;

    if (!plate || plate === '') {
      next(new AppError(PLATE_REQUIRED))
      return;
    }

    if (!regex.test(plate)) {
      next(new AppError(PLATE_FORMAT_INVALID))
      return;
    }

    next();
  }

  private checkDailyValue(req: Request, _res: Response, next: NextFunction) {
    const { daily_value } = req.body;

    if (daily_value === undefined) {
      next(new AppError(VALUE_REQUIRED))
      return;
    }

    if (daily_value < 1) {
      next(new AppError(MIN_VALUE_REQUIRED))
      return;
    }

    next();
  }

}

const vehicleMiddleware = new VehicleMiddleware();

export { vehicleMiddleware };