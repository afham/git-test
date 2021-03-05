import React , {useEffect, useState} from 'react';
import './App.css'; 
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions , setCurrencyOptions] = useState([])
  const [fromCurrency , setFromCurrency] = useState()
  const [toCurrency , setToCurrency] = useState()
  const [exchangeRate , setExchangeRate] = useState()
  const [amount , setAmount ] = useState(1)
  const [amountInFromCurrency , setAmountInFromCurrency] = useState(true)


  let toAmount , fromAmount
  if (amountInFromCurrency){
    fromAmount=amount
    toAmount = amount * exchangeRate
  }
  else{
    toAmount =amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(()=> {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data =>{
        setCurrencyOptions([data.base,...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(Object.keys(data.rates)[0])
        setExchangeRate(Object.keys(data.rates)[0])
      }
      )
  },[])

  

  return (
    <div className="App">
     <span>
        <h1>Currency Convert</h1>
        <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency ={event => setFromCurrency(event.target.value)} amount = {fromAmount} />
        <span>=</span>
        <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency ={event => setToCurrency(event.target.value) } amount = {toAmount}/>
      </span>
    </div>
  );
}

export default App;
