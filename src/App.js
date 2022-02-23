import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
  
function App() {
  
  // Initializing all the state variables 
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  
  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
   .then((res) => {
      setInfo(res.data[from]);
    })
  }, [from]);
  
  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])
    
  // Function to convert the currency
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }
  
  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
  
  return (
    <div className="App">
      <div className="heading">
        <h3>Conversor de Divisas</h3>
      </div>
      <div className="container">
        <div className="left">
          <h3 className='titleContainer'>Ingrese una cifra</h3>
          <input type="text" 
             placeholder="Ejm: 1000" 
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3 className='titleMiddle'>De:</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" 
                        onClick={() => { flip()}}/>
        </div>
        <div className="right">
          <h3>A:</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{convert()}}>Convertir</button>
        <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
  
      </div>
      <footer>© Richard Carrillo 2022</footer>
    </div>
  );
}
  
export default App;