import React from 'react'

const Spinner = () => {
    return (
        <div className='absolute w-full h-full flex justify-center items-center top-0 left-0 bg-white opacity-50'>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
        </div>
    )
}

export default Spinner