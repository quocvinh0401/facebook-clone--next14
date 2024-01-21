import { Payload } from 'security/payload';

export const isEmail = (str: string) => {
  return str.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const isPhone = (str: string) => {
  return str.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
};

export const whereUser = (payload: Payload): any => {
  const where = {};
  if (payload.email) where['email'] = payload.email;
  if (payload.phone) where['phone'] = payload.phone;

  return where;
};
