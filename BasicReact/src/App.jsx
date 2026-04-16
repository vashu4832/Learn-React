import React from 'react';
import Parent from './parent';
function App() {
  const appStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        fontFamily: 'Arial, sans-serif',
    };

  return (
    <div style={appStyle}>
      <Parent />  
    </div>
  )
}

export default App
