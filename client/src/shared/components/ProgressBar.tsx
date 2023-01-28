import React from 'react'

interface ProgressBarProps {
    progress: number
    title: string
}

const ProgressBar = ({
    progress,
    title
}: ProgressBarProps) => {
    return (
        <div className='bg-white h-16 w-1/2 mx-auto flex flex-col items-center justify-center z-30'>
            <div className="w-3/4 my-2 relative mx-auto bg-gray-200 h-3 z-30">
                <div className={`h-full bg-primary-600 relative z-30`}
                    style={{ width: `${progress}%` }}></div>
            </div>
            <span className='text-lg text-center'>
                {title}
            </span>
        </div>
    )
}

export default ProgressBar