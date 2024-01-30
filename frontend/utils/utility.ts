import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const days = () => {
  const _days = [];

  for (let i = 1; i <= 31; i++) {
    _days.push(i);
  }

  return _days;
};

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const years = () => {
  const _years = [];

  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= currentYear - 50; i--) {
    _years.push(i);
  }

  return _years;
};

export const isValidDate = (date: number, month: number, year: number) => {
  if (
    (year % 4 == 0 && date > 29) ||
    (year % 4 != 0 && date > 28) ||
    ([4, 6, 9, 11].includes(month) && date > 30)
  )
    return false;

  if (new Date(`${year}-${month}-${date}`).getTime() > new Date().getTime())
    return false;

  return true;
};

export const isValidMail = (str: string) => {
  return str.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const isValidPhone = (str: string) => {
  return str.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
};

export const serialize = (obj: any, prefix?: string): string => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v),
      );
    }
  }
  return str.join("&");
};

export const changeFormNumber = (number: number) => {
  return number > 1000 ? Math.round(number / 100) / 10 + "k" : number;
};

export const changeFormDate = (date: Date) => {
  const time = (new Date().getTime() - new Date(date).getTime()) / 1000; //second

  if (time < 60) return `${Math.round(time)}s`;
  else if (time < 60 * 60) return `${Math.round(time / 60)}m`;
  else if (time < 60 * 60 * 24)
    return `${Math.round(time / 60 / 60)} hour${
      Math.round(time / 60 / 60) == 1 ? "" : "s"
    } ago`;
  else if (time < 60 * 60 * 24 * 7)
    return `${Math.round(time / 60 / 60 / 24)} day${
      Math.round(time / 60 / 60 / 24) != 1 ? "s" : ""
    } ago`;
  else if (date.getFullYear() == new Date().getFullYear())
    return dayjs(date).format(`MMM D at m:s A`);
  else return dayjs(date).format(`MMM D, YYYY`);
};

export const isActiveNav = (current: string, pathname: string) => {
  return current == pathname;
};
