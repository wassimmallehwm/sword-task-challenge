import { Account } from "@modules/users/models/Account"

export type Task = {
    _id? : string
    title? : string
    summary? : string
    createdBy? : Account
    isPerformed? :  boolean
    performedAt? : Date
    createdAt? : Date
}

export const InitTask: Task = {
    title : '',
    summary : '',
    isPerformed :  false
}
