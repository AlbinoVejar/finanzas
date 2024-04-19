import dayjs from "dayjs";

export const FormatDate: string = "YYYY-MM-DD";
export const FormatMonthDate: string = "MMMM-YYYY";
export const ParseDate = (value: Date | string, onlyMonth: boolean = false) => (
  onlyMonth 
    ? dayjs(value).format(FormatMonthDate)
    : dayjs(value).format(FormatDate)
);
export const FormatCurreny = (value: number) => {
  const formarter = Intl.NumberFormat('es-MX', {style: 'currency', currency: "MXN"})
  const newValue = formarter.format(value);
  return newValue;
};
