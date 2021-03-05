
import React from 'react';




const CurrencyRow = (props) => {
   const {
       amount
   } = props
  
    
    let el=props.currencyOptions.map(item => (
        <option value={item}>{item}</option>
    ));
    
  
    return(
       <div>
        <input type="number" value = {amount} />
        <select value={props.selectedCurrency} onChange={props.onChangeCurrency}>
            {el}
        </select>
        </div>
    );
}

export default CurrencyRow;