import { toast } from 'react-toastify';


export const notify = {
    success: (message, options = {}) => toast.success(message, options),
    error: (message, options = {}) => toast.error(message, options),
    info: (message, options = {}) => toast.info(message, options),
    warning: (message, options = {}) => toast.warn(message, options),
    custom: (message, options = {}) => toast(message, options),
  };
  