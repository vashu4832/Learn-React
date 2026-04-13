import React, {useState} from "react"
function App() {
  const [counter, setCounter] = useState(15);

  function addValue(){
    setCounter(counter+1);
  }

  function removeValue(){
    setCounter(counter-1);
  }


  return (
    <>
      <h1>Hooks in React</h1>
      <h2>Counter Value: {counter}</h2>
      <button onClick={addValue}>Add Value {counter}</button>
      <br />
      <button onClick={removeValue}>Remove Value {counter}</button>
      <p>Counter = {counter}</p>
    </>
  )
}

export default App
