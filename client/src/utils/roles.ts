import { MANAGER } from "@config/const";

export const isManager = (label: string | undefined) => {
    return label && label === MANAGER
}