import moment from "moment"

export const formateDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY")
}

export const formateDateTime = (date: any) => {
    return moment(date).format("DD/MM/YYYY HH:mm")
}

export const fromNow = (date: any) => {
    return moment(date).fromNow()
}

export const formatDateTimeToInput = (date: any) => {
    return moment(date).format('YYYY-MM-DD HH:mm')
}