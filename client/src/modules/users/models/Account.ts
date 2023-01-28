export type Account = {
    id? : string
    username? : string
    email? : string
    firstname? : string
    lastname? :  string
    displayName?: string
    role?: string
    createdAt? : Date
}

export const EmptyAccount: Account = {
    email : "",
    firstname : "",
    lastname :  ""
};
