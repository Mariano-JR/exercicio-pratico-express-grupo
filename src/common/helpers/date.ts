import { format, differenceInHours as diffInHours } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy HH:mm');
}

export const differenceInHours = (dateOne: Date, dateTwo: Date): number => {
  return diffInHours(dateTwo, dateOne);
}
