import React from 'react'



export default function Child({name="Ashutosh", age=18, city="Mumbai"}) {
    const childStyle = {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
    };
    return (
        <>
            <div style={childStyle}>
                <h2>Hello, {name} !</h2>
                <p>You are {age} years old.</p>
                <p>You live in {city}</p>
            </div>
        </>
    )
}
