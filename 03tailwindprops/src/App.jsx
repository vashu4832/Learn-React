import Card from "./components/Card";

function App() {
  return (
    <>
      <h1 className="bg-green-400 text-black text-center p-10 mx-80 my-2 text-9xl rounded-3xl">
        Tailwind Test
      </h1>
      <Card username="Ashutosh" price={2300}/>
      <Card username="Navin" price={2100}/>
      <Card price={2000}/>
      <Card username="Suraj" price={2500}/>

     
    </>
  );
}

export default App;
