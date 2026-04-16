import React from 'react'
import Child from './child'
function Parent() {
    const parentStyle = {
        textAlign: 'center',  
    };
    return (
        <div style={parentStyle}>
            <h1>Welcome to the Parent Component</h1>
            <Child name='Navin' age={22} city='Delhi'/>
            <Child />
        </div>
    )
}

export default Parent
