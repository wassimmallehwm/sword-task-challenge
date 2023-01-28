import { Account } from "@modules/users/models/Account";

export type AuthResponse = {
    user: Account;
    access_token?: string;
    refresh_token?: string;
}
