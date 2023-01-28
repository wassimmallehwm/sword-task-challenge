import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Account } from '@modules/users/models/Account'
import { Input, Select } from '@shared/components/form'
import { httpErrorHandler, showLoading, showToast } from 'src/utils'

interface UsersFormProps {
    account: Account,
    onChange: any
}

const UsersForm = ({
    account,
    onChange
}: UsersFormProps) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const { firstname, lastname, email, role } = account;

    return (
        <form action="" className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Firstname
                </label>
                <Input type="text" name="firstname" value={firstname} onChange={onChange} />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Lastname
                </label>
                <Input type="text" name="lastname" value={lastname} onChange={onChange} />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Email
                </label>
                <Input type="email" name="email" value={email} onChange={onChange} />
            </div>
            {/* <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Roles
                </label>
                <Select name="role" value={role?._id} onChange={onChange}>
                    <option disabled selected value=''>Select role</option>
                    {
                        roles && roles.map((role: any) => (
                            <option key={role._id} value={role._id}>
                                {role.label}
                            </option>
                        ))
                    }
                </Select>
            </div> */}
        </form>
    )
}

export default UsersForm