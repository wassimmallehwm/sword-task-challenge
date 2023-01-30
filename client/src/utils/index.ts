import EventsEmitter from "./events";
import { isManager } from "./roles";
import { dismissAllToasts, showToast, showLoading, showNotif } from "./toast";

export {
    showToast,
    showNotif,
    showLoading,
    dismissAllToasts,
    isManager,
    EventsEmitter
}