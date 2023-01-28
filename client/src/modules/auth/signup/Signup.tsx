import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../auth.service';
import logo from '@assets/logo.png'

const Signup = () => {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const { email, firstname, lastname, password, confirmPassword } = signupInfo;

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value })
    }
    
    const onSubmit = (e: any) => {
        e.preventDefault();
        authService.signup(signupInfo).then(
            res => {
            },
            error => {
                console.log("ERROR", error.response.data.msg);
            }
        )
    }
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto flex flex-col items-center">
                <img src={logo} className="w-32 text-center" />
                <div className="text-3xl font-bold text-gray-800 text-center">
                    Gym Park | Signup
                </div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <form action="" className="space-y-6" onSubmit={onSubmit}>
                <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Email
                        </label>
                        <input type="email" name="email" onChange={onChange} value={email}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Firstname
                        </label>
                        <input type="text" name="firstname" onChange={onChange} value={firstname}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Lastname
                        </label>
                        <input type="text" name="lastname" onChange={onChange} value={lastname}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Password
                        </label>
                        <input type="password" name="password" onChange={onChange} value={password}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Confirm Password
                        </label>
                        <input type="password" name="confirmPassword" onChange={onChange} value={confirmPassword}
                            className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>
                            <button onClick={() => navigate('/login')} className="font-medium text-sm text-primary-500">
                                You already have an account ? Login !
                            </button>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 
                        rounded-md text-white text-sm">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
