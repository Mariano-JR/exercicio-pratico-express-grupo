import handlebars from "handlebars";
import fs from 'fs';
import path from 'path';
import { vehicleTypeMap } from "../enums";
import { availableFormat, formatCurrency } from "./format";

export const createTemplate = (fileName: string) => {
  const htmlFile = fs.readFileSync(
    path.resolve(__dirname, '..', 'templates', 'handlebars', fileName),
    "utf-8"
  );

  handlebars.registerHelper("numberFormat", (number: number) => {
    return formatCurrency(number);
  })

  handlebars.registerHelper("vehicleTypeFormat", (value: string) => {
    return vehicleTypeMap(value);
  })

  handlebars.registerHelper("availableFormat", (value: string) => {
    return availableFormat(value);
  })

  const template = handlebars.compile(htmlFile);
  return template;
}
