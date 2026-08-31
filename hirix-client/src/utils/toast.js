import { toast } from "react-toastify";

// Thin wrapper around react-toastify so the rest of the app never imports
// the library directly - swapping toast libraries later only touches this
// file, and every call site gets consistent options/placement.
const defaultOptions = {
  position: "top-right",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const showSuccess = (message, options = {}) =>
  toast.success(message, { ...defaultOptions, ...options });

export const showError = (message, options = {}) =>
  toast.error(message, { ...defaultOptions, ...options });

export const showInfo = (message, options = {}) =>
  toast.info(message, { ...defaultOptions, ...options });

export const showWarning = (message, options = {}) =>
  toast.warning(message, { ...defaultOptions, ...options });
