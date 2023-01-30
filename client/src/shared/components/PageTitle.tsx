import React from 'react'

interface PageTitleProps {
    color?: string
    children?: any
}

const PageTitle = ({
    color = 'primary',
    children
}: PageTitleProps) => {
    return (
        <div className={`text-${color}-600 text-3xl font-bold my-2`}> {children} </div>
    )
}

export default PageTitle
