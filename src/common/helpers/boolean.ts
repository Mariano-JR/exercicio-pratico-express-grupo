import { AppError } from "../errors/app-error";

export const formatToBoolean = (value: string): boolean => {
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false
  throw new AppError('O status deve ser do tipo boolean (true, false)');
}
