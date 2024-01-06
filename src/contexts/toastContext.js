import { createContext ,useState} from "react";
import MySnackbar from "../components/MySnackbar";

export const toastContext = createContext({})
export const TostProvider=({children})=>{
    const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
     const showHideToast = (message) => {
         setOpen(true);
         setMessage(message)
         setTimeout(() => {
           setOpen(false);
         }, 2000);
       };
    return <toastContext.Provider value={{ showHideToast }}>
        <MySnackbar open={open} setOpen={setOpen} message={message} />
        {children}
        </toastContext.Provider>
  }