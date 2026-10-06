import React from 'react'

const Button = ({ text, onClick }) => {
    return (
        <button className='bg-inverted text-inverted border rounded-full px-6 py-2 mx-3' onClick={onClick}>{text}</button>
    )
}

export default Button