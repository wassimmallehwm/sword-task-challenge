import toast, { Toast } from "react-hot-toast";

const toastOptions:
    Partial<Pick<Toast, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme">> | undefined
    = {
    duration: 3500,
    position: 'top-center',
    style: {},
    className: '',
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    }
}

export const showNotif = (element: any) => {
    toast.custom((t) => (
        element
      ))
}

export const toastError = (text: string | Element) => {
    toast.dismiss()
    toast.error(text.toString(), toastOptions);
}

export const toastSuccess = (text: string | Element) => {
    toast.dismiss()
    toast.success(text.toString(), toastOptions);
}

export const showToast = (type: string, text: string | Element) => {
    toast.dismiss()
    switch (type) {
        case 'success':
            toast.success(text.toString(), toastOptions);
            break;
        case 'error':
            toast.error(text.toString(), toastOptions);
            break;
        case 'loading':
            toast.loading(text.toString(), {...toastOptions, duration: 10000});
            break;
        default:
            toast(text.toString(), toastOptions);
    }
}

export const showLoading = () => {
    toast.loading("Loading ...", {...toastOptions, duration: 10000});
}



export const dismissAllToasts = () => {
    toast.dismiss()
}