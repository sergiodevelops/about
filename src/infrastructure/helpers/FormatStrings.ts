import { defaultVisualFormatDate } from "entrypoint/presenters/web/helpers/FormatStrings";
import moment from "moment";

export const getStringDate = (date?: number | string | Date, format?: string) => moment(date || Date.now()).format(format || defaultVisualFormatDate);