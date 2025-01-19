import { toast, ToastOptions } from "react-toastify";

export type ToastType = "success" | "error" | "info" | "warning";

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const showToast = (
  type: ToastType,
  message: string,
  options: ToastOptions = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, mergedOptions);
      break;
    case "error":
      toast.error(message, mergedOptions);
      break;
    case "info":
      toast.info(message, mergedOptions);
      break;
    case "warning":
      toast.warning(message, mergedOptions);
      break;
    default:
      console.error("Invalid toast type");
  }
};
