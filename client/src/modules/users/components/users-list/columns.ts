import i18next from "i18next"

export const columns = () => {
    return [
        { field: 'displayName', headerName: i18next.t('name'), minWidth: 150, flex: true },
        { field: 'username', headerName: i18next.t('username'), minWidth: 150, flex: true },
        { field: 'email', headerName: i18next.t('email'), minWidth: 150, flex: true }
    ]
}