import { To } from "react-router-dom"

export type DropdownItem = {
    label?: string
    key?: string
    component?: JSX.Element
    isLink?: boolean
    action?: To | any
}