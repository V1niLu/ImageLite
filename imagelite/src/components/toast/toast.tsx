import { toast } from 'react-toastify';

export function useNotification() {

    const Notify = (message: string, level : "success" | "info" | "warning" | "error") => {
        toast(message, {
            type: level,
            
        })
    }

  return (
    Notify
  );
}