import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid} = useParams()
    return (
        <div className='bg-gray-600 text-white text-4xl p-6 mx-100 px-60'>User: {userid}</div>
    )
}

export default User
