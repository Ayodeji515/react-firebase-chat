import { toast } from "react-toastify";

const Notification = (text, types) => {
  console.log(text, types);

  if (types === "success") {
    toast.success(text);
  }
  if (types === "error") {
    toast.error(text);
  }
  if (types === "warning") {
    toast.warn(text);
  }
  if (types === "info") {
    toast.info(text);
  }
  if (types === "") {
    toast(text);
  }
};

export default Notification;