// hooks/useToast.js
import { sileo } from "sileo";

export const useToast = () => {

  const success = (title, description) => sileo.success({ title, description });

  const error = (title, description) => sileo.error({ title, description });

  const info = (title, description) => sileo.info({ title, description });

  const warning = (title, description) => sileo.warning({ title, description });

  const promise = (promise, messages) => sileo.promise(promise, messages);

  return {
    success,
    error,
    info,
    warning,
    promise,
  };
};
