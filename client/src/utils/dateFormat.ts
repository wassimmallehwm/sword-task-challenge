import moment from "moment"

export const formatDateTime = (date: any) => {
    return date && date.toString().trim() !== "" ?
        moment(date).format("DD/MM/YYYY HH:mm") : ""
}

export const formatDateTimeToInput = (date: any) => {
    return date && date.toString().trim() !== "" ?
        moment(date).format('YYYY-MM-DD HH:mm') : ""
}