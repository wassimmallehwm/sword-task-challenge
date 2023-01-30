import { useState, useEffect, useContext } from 'react'
import { PageTitle } from '@shared/components';
import { AuthContext } from '@contexts/auth/AuthContext';
import { toastError } from '@utils/toast';
import usersService from '@modules/users/services/users.service';
import { useTranslation } from 'react-i18next';
import { useDataGrid } from '@hooks/index';
import { columns } from './columns';
import { Account } from '@modules/users/models/Account';

const Users = () => {
    const { user } = useContext(AuthContext)
    const { t } = useTranslation()

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async () => {
        setLoading(true)
        const { response, error, success } = await usersService.list(dataGrid.params);
        if (success && response) {
            setAccounts(response.docs)
            dataGrid.setRowCount(response.total)
        } else {
            toastError(error?.message)
        }
        setLoading(false)
    }

    const dataGrid = useDataGrid({
        columns: columns(),
        loading: loading,
        rows: accounts
    })

    useEffect(() => {
        getUsers();
    }, dataGrid.effectParams);

    return (
        <div className="main-div">
            <PageTitle color="primary">{t('titles.technicians')}</PageTitle>
            {dataGrid.grid}
        </div>
    )
}

export default Users
