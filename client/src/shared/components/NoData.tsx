import React from 'react'

const NoData = ({
    msg = 'No data available'
}) => {
    return (
        <div className='
            w-full h-24 
            flex items-center justify-center 
            text-2xl text-gray-500 font-semibold'>
            {msg}
        </div>
    )
}

export default NoData