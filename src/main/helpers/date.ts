import { format, parse, differenceInHours as diffInHours } from 'date-fns';

export function formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy HH:mm');
}

export function formatDateToSave(dateString: string): Date {
    return parse(dateString, 'dd/MM/yyyy', new Date())
}

export function differenceInHours(dateOne: Date, dateTwo: Date): number {
    return diffInHours(dateTwo, dateOne)
}