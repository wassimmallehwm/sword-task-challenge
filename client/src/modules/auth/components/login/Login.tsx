import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@contexts/auth/AuthContext';
import authService from '../../services/auth.service';
import logo from '@assets/logo.png';
import { SocketContext } from '@contexts/index';
import { Account } from '@modules/users/models/Account';
import { toastError } from '@utils/toast';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '@modules/auth/validation/schema';

const Login = () => {
    const { t } = useTranslation()
    const { login } = useContext(AuthContext)
    const { connect } = useContext(SocketContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(formOptions);

    const onLogin = (data: Account) => {
        login(data)
        connect(data)
        navigate('/')
    }

    const onSubmit = async (data : any, e: any) => {
        e.preventDefault();
        setLoading(true)
        const { response, error, success } = await authService.authenticate(data)
        if (success && response) {
            onLogin(response)
        } else {
            toastError(error?.message)
        }
        setLoading(false)
    }

    return (
        <div className="bg-primary-50 px-4 h-full flex justify-center items-center">
            <div className="max-w-md w-full mx-auto bg-white px-8 pb-8 rounded-lg shadow-lg">
                <div className="max-w-md w-full mx-auto flex flex-col items-center gap-4 py-2">
                    <img src={logo} className="w-32 text-center" />
                    <div className="text-2xl font-bold text-gray-800 text-center">
                        {t('app_name')} | {t('btns.login')}
                    </div>
                </div>
                <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor='username' className="text-sm font-bold text-gray-600 block">
                            {t('emailOrUsername')}
                        </label>
                        <input id="username" type="text" {...register('username')}
                            className={`w-full h-9 rounded mt-1 outline-hidden focus:border-primary-300 
                            focus:outline-none focus:ring-1 bg-white py-1 px-2 border
                            ${errors.username ? 'border-secondary-600' : 'border-gray-300'}`} />
                        {
                            errors.username ?
                                <div className="text-secondary-600">
                                    {errors.username?.message?.toString()}
                                </div>
                                : null
                        }
                    </div>
                    <div>
                        <label htmlFor='password' className="text-sm font-bold text-gray-600 block">
                            {t('password')}
                        </label>
                        <input type="password" id="password" {...register('password')}
                            className={`w-full h-9 rounded mt-1 outline-hidden focus:border-primary-300 
                            focus:outline-none focus:ring-1 bg-white py-1 px-2 border
                            ${errors.password ? 'border-secondary-600' : 'border-gray-300'}`} />
                        {
                            errors.password ?
                                <div className="text-secondary-600">
                                    {errors.password?.message?.toString()}
                                </div>
                                : null
                        }
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className={`w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 
                        rounded-md text-white text-sm`}>
                            {loading ? `${t('loading')}...` : t('btns.login')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
