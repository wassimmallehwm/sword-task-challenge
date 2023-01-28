import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
    color: string
    outline?: boolean
    rounded?: boolean
    submit?: boolean
    title?: string
    small?: boolean
    margin?: boolean
    asDiv?: boolean
    onClick?: any
    children?: any
    [x: string]: any;
}

const Button = ({
    color,
    outline,
    rounded,
    submit,
    title,
    small,
    margin = true,
    asDiv = false,
    onClick,
    children,
    ...props
}: ButtonProps) => {
    const { t } = useTranslation()

    const btnPadd = rounded && small ? 'px-1 py-1' : rounded ? 'px-2 py-2' : small ? 'px-2 py-1 h-7' : 'px-4 py-2 h-9'
    const btnMargin = margin ? 'mx-1' : 'mx-0'
    const btnClass = outline ?
        `text-${color}-500 border border-${color}-500 hover:bg-${color}-50 font-bold uppercase text-xs ${btnPadd} ${rounded ? 'rounded-full' : 'rounded'} shadow-lg hover:shadow-2xl outline-none focus:outline-none ${btnMargin} ease-linear transition-all duration-150 disabled:text-gray-400 disabled:cursor-not-allowed`
        : `bg-${color}-600 text-white hover:bg-${color}-400 font-bold uppercase text-xs ${btnPadd} ${rounded ? 'rounded-full' : 'rounded'} shadow-lg hover:shadow-2xl outline-none focus:outline-none ${btnMargin} ease-linear transition-all duration-150 disabled:text-gray-400 disabled:cursor-not-allowed`
    return asDiv ? (
        <div {...props} className={btnClass}>
            {children}
        </div>
    ) : (
        <Tooltip title={t(`btns.${title}`)}>
            <button onClick={onClick} className={btnClass} type={`${submit ? "submit" : "button"}`}>
                {children}
            </button>
        </Tooltip>

    )
}

export default Button
